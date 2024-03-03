import React from "react";
import { ReactComponent as Like } from "./assets/like.svg";
import { ReactComponent as Save } from "./assets/save.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:8000/api";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  const getUsersData = async () => {
    const response = await axios.get(baseUrl + "/user/");
    setUserData(response.data);
  };
  // console.log(postData);
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
  // console.log(postData);
  console.log(userData);
  useEffect(() => {
    getUsersData();
    getPost();
  }, []);

  return (
    <div className="overflow-y-scroll w-[100vw] h-[100vh] ">
      <div className="flex flex-col items-center justify-evenly">
        <div className="mt-[4.5rem] mb-[3rem]">
          <p className="text-[30px] font-bold">Home Feed</p>
        </div>
        {postData.map((posts, index) => {
          const userid = userData.map((user) => user.id);
          return (
            <div
              key={index}
              className="flex flex-col gap-4 justify-evenly p-10 border-gray-700 border-[0.001rem]"
            >
              <div className="flex gap-3">
                <div>
                  {userid.find((user) => user == posts.user) ? (
                    <img
                      width={100}
                      src={userData.map((profile) => profile.featured_img)}
                    ></img>
                  ) : (
                    "Logo"
                  )}
                </div>
                <div>
                  <p>{posts.username}</p>
                  <p>
                    {getTime(posts)} - {posts.add_location}
                  </p>
                </div>
              </div>
              <Link to={`/home/post/${posts.id}`}>
                <div>
                  <img
                    width={600}
                    // height={1000}
                    src={posts.add_photos}
                    alt=""
                    srcset=""
                  />
                </div>
                <div>
                  <p>
                    {getTitle(posts)}
                    {"...."}
                  </p>
                  <p># {posts.add_tags}</p>
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
