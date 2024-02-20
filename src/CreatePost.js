import React from "react";
import { ReactComponent as AddPost } from "./assets/add-post.svg";
import { ReactComponent as AddImage } from "./assets/file-upload.svg";
import { useRef, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8000/api";
const CreatePost = () => {
  const [post, setPost] = useState({
    caption: "",
    add_photos: "",
    add_location: "",
    add_tags: "",
  });

  const user_id = localStorage.getItem("user_id");

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPost({
      ...post,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    const postData = new FormData();
    postData.append("user", user_id);
    postData.append("caption", post.caption);
    postData.append("add_photos", post.add_photos, post.add_photos.name);
    postData.append("add_location", post.add_location);
    postData.append("add_tags", post.add_tags);

    try {
      axios
        .post(baseUrl + "/post/", postData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-10 overflow-y-auto ml-96 mt-[4.5rem]">
      <div className="flex items-center gap-4">
        <AddPost />
        <h1 className="text-[30px] font-bold">CreatePost</h1>
      </div>
      <div>
        <div>
          <h3 className="mb-3 font-bold">Caption</h3>
          <textarea
            className="bg-[#101012] rounded-xl focus:outline-[#736ddb]"
            name="caption"
            onChange={handleChange}
            value={post.caption}
            id="caption"
            cols="135"
            rows="7"
          ></textarea>
        </div>
        <div>
          <h3 className="mb-3 mt-4 font-bold">Add Photos</h3>
          <div
            className="flex flex-col items-center p-48 bg-[#101012] rounded-xl"
            onClick={handleImageClick}
          >
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <AddImage />
            )}

            <input
              name="add_photos"
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              //   value={post.add_photos}
              style={{ display: "none " }}
            />

            <p className="text-[#817ce3]">SVG, PNG, JPG</p>
          </div>
          <div>
            <h3 className="mb-4 mt-6 font-bold">Add Location</h3>
            <input
              className="bg-[#101012] p-3 focus:outline-[#736ddb] rounded-[6px] w-[100%]"
              name="add_location"
              onChange={handleChange}
              value={post.add_location}
            ></input>
          </div>
          <div>
            <h3 className="mb-4 mt-6 font-bold">Add Tags</h3>
            <input
              className="bg-[#101012] p-3 focus:outline-[#736ddb] rounded-[6px] w-[100%]"
              name="add_tags"
              onChange={handleChange}
              value={post.add_tags}
            ></input>
          </div>
          <div className="flex justify-end gap-9 mb-16 mt-8">
            <button className="bg-[#101012] p-3 rounded-[6px] w-[20%] ">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#6761dd] p-3 rounded-[6px] w-[20%]"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
