import React from "react";
import { ReactComponent as Like } from "./assets/like.svg";
import { ReactComponent as Save } from "./assets/save.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:8000/api";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  // const [userData, setUserData] = useState([]);

  // const getUsersData = async () => {
  //   const response = await axios.get(baseUrl + "/user/");
  //   setUserData(response.data);
  // };

  const getTime = (posts) => {
    return new Date(posts.created).toLocaleDateString();
  };

  let getTitle = (posts) => {
    let title = posts.caption.split("\n")[0];
    if (title.length > 45) {
      return title.slice(0, 45);
    }
    return title;
  };

  const getPost = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post/`);
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getUsersData();
    getPost();
  }, []);

  return (
    <div className="overflow-y-scroll w-[100vw] h-[100vh] ">
      <div className="flex flex-col items-center justify-evenly">
        <div className="mt-[4.5rem] mb-[3rem]">
          <p className="text-[30px] font-bold">Home Feed</p>
        </div>
        {postData.map((post, index) => {
          // another way to get user data
          // const currentPostUser = userData.find(
          //   (user) => user.id === post.user
          // );

          return (
            <div
              key={index}
              className="flex flex-col gap-4 justify-evenly p-10 border-gray-700 border-[0.001rem]"
            >
              <div className="flex gap-3">
                <div>
                  <img width={80} alt="Logo" src={post.user.featured_img}></img>
                </div>
                <div>
                  <p>{post.username}</p>
                  <p>
                    {getTime(post)} - {post.add_location}
                  </p>
                </div>
              </div>
              <Link to={`/home/post/${post.id}`}>
                <div>
                  <img
                    width={600}
                    // height={1000}
                    src={post.add_photos}
                    alt=""
                    srcset=""
                  />
                </div>
                <div>
                  <p>
                    {getTitle(post)}
                    {"...."}
                  </p>
                  <p># {post.add_tags}</p>
                </div>
              </Link>
              <div className="flex justify-between">
                <Like />
                <Save />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
