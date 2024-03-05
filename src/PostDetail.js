import React from "react";
import { ReactComponent as Like } from "./assets/like.svg";
import { ReactComponent as Save } from "./assets/save.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:8000/api";

const PostDetail = () => {
  const [postData, setPostData] = useState([]);
  const { post_id } = useParams();

  const current_user_id = localStorage.getItem("user_id");

  const getPost = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user-post/${post_id}`);
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTime = (postData) => {
    return new Date(postData.created).toLocaleDateString();
  };

  useEffect(() => {
    getPost();
    document.title = "Post";
  }, []);

  return (
    <div className="overflow-y-scroll w-[100vw] h-[100vh] ">
      <div className="flex  items-center justify-evenly">
        <div className="flex mt-[4.5rem] w-[50%] mb-[3rem] flex-col gap-4 justify-evenly p-10 border-gray-700 border-[0.001rem]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div>
                <img
                  className="rounded-[100%]"
                  width={80}
                  alt="Logo"
                  src={postData?.user?.featured_img}
                ></img>
              </div>
              <div>
                <p>{postData.username}</p>
                <p>
                  {getTime(postData)} - {postData.add_location}
                </p>
              </div>
            </div>
            <div>
              {current_user_id == postData?.user?.id ? (
                <Link
                  to="/home/editpost"
                  className="bg-[#6761dd] text-center p-3 rounded-[6px] w-[15%]"
                >
                  Edit Post
                </Link>
              ) : null}
            </div>
          </div>
          <Link to={`/home/post/${postData.id}`}>
            <div>
              <img
                width={600}
                // height={1000}
                src={postData.add_photos}
                alt="Photo"
                srcset=""
              />
            </div>
            <div>
              <p>{postData.caption}</p>
              <p># {postData.add_tags}</p>
            </div>
          </Link>
          <div className="flex justify-between">
            <Like />
            <Save />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
