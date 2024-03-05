import React, { useEffect } from "react";
import { ReactComponent as AddPost } from "./assets/add-post.svg";
import { ReactComponent as AddImage } from "./assets/file-upload.svg";
import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:8000/api";
const EditPost = () => {
  const [post, setPost] = useState({
    name: "",
    username: "",
    caption: "",
    add_photos: "",
    add_location: "",
    add_tags: "",
  });
  const { post_id } = useParams();

  const getData = async () => {
    const response = await axios.get(`${baseUrl}/post/${post_id}`);
    setPost({
      name: response.data.name,
      username: response.data.username,
      caption: response.data.caption,
      prev_add_photos: response.data.add_photos,
      add_photos: "",
      add_location: response.data.add_location,
      add_tags: response.data.add_tags,
    });
  };

  const user_id = localStorage.getItem("user_id");
  const user_name = localStorage.getItem("user_name");

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
    postData.append("username", user_name);
    postData.append("caption", post.caption);
    if (post.add_photos !== "") {
      postData.append("add_photos", post.add_photos, post.add_photos.name);
    }
    postData.append("add_location", post.add_location);
    postData.append("add_tags", post.add_tags);

    try {
      axios
        .put(baseUrl + "/post/" + post_id, postData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          window.location.href = "/home/allpost";
        });
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };
  useEffect(() => {
    document.title = "Edit Post";
    getData();
  }, []);
  return (
    <div className="overflow-y-scroll w-[100vw] h-[100vh]">
      <div className="flex flex-col gap-10 mr-32 ml-32 mt-[4.5rem]">
        <div className="flex items-center gap-4">
          <AddPost />
          <h1 className="text-[30px] font-bold">Edit Post</h1>
        </div>
        <div>
          <div>
            <h3 className="mb-3 font-bold">Caption</h3>
            <textarea
              className="bg-[#101012] w-[100%] p-1 rounded-xl focus:outline-[#736ddb]"
              name="caption"
              onChange={handleChange}
              value={post.caption}
              id="caption"
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

              <p className="text-[#817ce3]">SVG, PNG, JPG, WEBP</p>
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
              <Link
                to="/home/allpost"
                className="bg-[#101012] text-center p-3 rounded-[6px] w-[20%] "
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                className="bg-[#6761dd] p-3 rounded-[6px] w-[20%]"
              >
                Edit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
