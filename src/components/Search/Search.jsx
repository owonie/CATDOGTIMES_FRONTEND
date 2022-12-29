import { useState } from "react";
import "./Search.css";
import "./reset.css";
import PullDown from "./PullDown/PullDown";
import PullDownSearch from "./PullDownSearch/PullDownSearch";

function Search() {
  const [search, setSearch] = useState("");

  function saveSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="search">
      <input
        className="searchInput"
        type="text"
        placeholder="search..."
        onChange={(event) => {
          saveSearch(event);
        }}
      />
      <div className="pullDownBox">{search === "" ? <PullDown search={search} /> : <PullDownSearch search={search} />}</div>
    </div>
  );
}

export default Search;
