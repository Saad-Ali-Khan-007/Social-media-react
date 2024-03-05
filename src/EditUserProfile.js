import React, { useEffect } from "react";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { ReactComponent as AddImage } from "./assets/file-upload.svg";
import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:8000/api";
const EditUserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    prev_img: "",
    featured_img: "",
  });
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const user_id = localStorage.getItem("user_id");

  const getData = async () => {
    const response = await axios.get(`${baseUrl}/user/${user_id}`);
    setProfile({
      name: response.data.name,
      username: response.data.username,
      email: response.data.email,
      password: response.data.password,
      prev_img: response.data.featured_img,
      featured_img: "",
    });
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProfile({
      ...profile,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSubmit = (event) => {
    const profileData = new FormData();
    profileData.append("user", user_id);
    profileData.append("name", profile.name);
    profileData.append("username", profile.username);
    profileData.append("email", profile.email);
    profileData.append("password", profile.password);
    if (profile.featured_img !== "") {
      profileData.append(
        "featured_img",
        profile.featured_img,
        profile.featured_img.name
      );
    }

    try {
      axios
        .put(baseUrl + "/user/" + user_id, profileData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          window.location.href = "/home/editprofile";
        });
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };

  useEffect(() => {
    getData();
    document.title = "Edit Profile";
  }, []);

  return (
    <div className="overflow-y-scroll w-[100vw] h-[100vh]">
      <div className="flex flex-col gap-10 mr-32 ml-32 mt-[4.5rem]">
        <div className="flex items-center gap-4">
          <Edit />
          <h1 className="text-[30px] font-bold">Edit Profile</h1>
        </div>
        <div>
          <div>
            <h3 className="mb-3 font-bold">Name</h3>
            <input
              className="bg-[#101012] p-3 focus:outline-[#736ddb] rounded-[6px] w-[100%]"
              name="name"
              onChange={handleChange}
              value={profile.name}
            ></input>
          </div>
          <div>
            <h3 className="mb-3 font-bold">Username</h3>
            <input
              className="bg-[#101012] p-3 focus:outline-[#736ddb] rounded-[6px] w-[100%]"
              name="username"
              onChange={handleChange}
              value={profile.username}
            ></input>
          </div>
          <div>
            <h3 className="mb-3 mt-4 font-bold">Profile Picture</h3>
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
                name="featured_img"
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                // value={profile.prev_img}
                style={{ display: "none " }}
              />

              <p className="text-[#817ce3]">SVG, PNG, JPG, WEBP</p>
            </div>

            <div className="flex justify-end gap-9 mb-16 mt-8">
              <Link
                to="/home/people"
                className="bg-[#101012] p-3 text-center rounded-[6px] w-[20%] "
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                className="bg-[#6761dd] p-3 rounded-[6px] w-[20%]"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
