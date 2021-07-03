import React, { useEffect } from "react";
import axios from "axios";
const test = () => {
  function frtchapi() {
    const config = {
      headers: {
        Authorization: "Token 74a38f33f7a10e19895c5c50589c249e938cd30b",
      },
    };
    const ownPostUrl =
      "http://127.0.0.1:8000/newsfeed/post/?username=saimonazad";
    const followerPostUrl = "http://127.0.0.1:8000/newsfeed/follower/";
    const data1 = axios.get(ownPostUrl, config);
    const data2 = axios.get(followerPostUrl, config);
    Promise.all([data1, data2]).then((values) => {
      let followingPosts = [...values[1].data].flat();
      const allPosts = [...values[0].data, ...followingPosts];
      allPosts.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      console.log(allPosts);
    });
  }
  useEffect(() => {
    frtchapi();
  }, []);

  return <div>he</div>;
};

export default test;
