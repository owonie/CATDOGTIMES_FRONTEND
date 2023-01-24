import { useState } from "react";
import "./Search.css";
import "./reset2.css";
import PullDown from "./PullDown/PullDown";
import PullDownSearch from "./PullDownSearch/PullDownSearch";
import { useSelector } from "react-redux";

function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  function saveSearch(event) {
    setSearch(event.target.value);
  }

  const loadData = async () => {
    const response = await fetch(`post/search?id=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
    });
    let data = await response.json();
    setData(data);

    if (response.status === 401) {
      const res = await fetch(`post/search?id=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
      });
      data = await res.json();
      setData(data);
    }
  };

  return (
    <div className="search">
      <input
        id="searchInput"
        type="text"
        placeholder="Search"
        onChange={(event) => {
          saveSearch(event);
          loadData();
        }}
      ></input>
      <div className="pullDownBox">{search === "" ? <PullDown search={search} /> : <PullDownSearch data={data} />}</div>
    </div>
  );
}

export default Search;
