import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Explore.css";

const Explore = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageSrc: "/img/explore/puppy.jpg",
      caption: "산책하는 댕댕이",
    },
    {
      id: 2,
      imageSrc: "/img/explore/kitten2.jpg",
      caption: "기다리는 고양이",
    },
    {
      id: 3,
      imageSrc: "/img/explore/dog1.jpg",
      caption: "댕댕이 남친짤",
    },
    {
      id: 4,
      imageSrc: "/img/explore/dog2.jpg",
      caption: "dog with flowers",
    },
    {
      id: 5,
      imageSrc: "/img/explore/kitten3.jpg",
      caption: "다소곳한 고양이",
    },
    {
      id: 6,
      imageSrc: "/img/explore/cat1.jpg",
      caption: "선글라스 쓴 고양이",
    },
    {
      id: 7,
      imageSrc: "/img/explore/cat1.jpg",
      caption: "선글라스 쓴 고양이",
    },
    {
      id: 8,
      imageSrc: "/img/explore/cat1.jpg",
      caption: "선글라스 쓴 고양이",
    },
    {
      id: 9,
      imageSrc: "/img/explore/cat1.jpg",
      caption: "선글라스 쓴 고양이",
    },
  ]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch();
      const data = await res.json();
      console.log(data);
      setPosts(data);
    }
    fetchData();
  }, []);

  return (
    <div className="explore">
      <nav id="nav">
        <NavBar />
      </nav>
      <section className="explore__content">
        {posts.map((post) => (
          <a href="#">
            <div key={post.id} className="post2">
              <img src={post.imageSrc} alt={post.caption} />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};

export default Explore;
