import React, { useEffect } from "react";
import axios from "axios";
import Header from "../../components/mypage/Header";
import Side from "../../components/mypage/Side";
import Mobilemenu from "../../components/mypage/Mobilemenu";
import Backtobtn from "../../components/mypage/Backtobtn";
import Footer from "../../components/mypage/Footer";
import Searchbox from "../../components/mypage/Searchbox";
import Main_header from "../../components/mypage/Main_header";
import Tab_section from "../../components/mypage/Tab_section";
import Mywalks from "../../components/mypage/Mywalks";
import Joined_walks from "../../components/mypage/Joined_walks";

const Mypage = ({ user, sessionInfo }) => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    myPageTest();
  }, []);

  const myPageTest = () => {
    const id = sessionStorage.getItem("userid");
    console.log(id);
    axios
      .post("/memberinfo", null, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setUsers(res.data);
        sessionInfo(res.data);
      })
      .catch();
  };

  return (
    <>
      <div id="nt_wrapper">
        <Header users={users} />
        <div id="nt_content" className="mainContent p-5">
          <div>Mypage page</div>
          <Main_header users={users} />
          <Tab_section users={users} />
          <Mywalks users={users} />
          <Joined_walks users={users} />
        </div>
        <Side users={users} />
        <Footer />
      </div>
      <Searchbox users={users} />
      <Mobilemenu users={users} />
      <Backtobtn />
    </>
  );
};

export default Mypage;
