import React from "react";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { ReactComponent as AddImage } from "./assets/file-upload.svg";
import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const EditUserProfile = () => {
  const [profile, setProfile] = useState({});
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const user_id = localStorage.getItem("user_id");
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
  //   const handleSubmit = (event) => {
  //     const postData = new FormData();
  //     postData.append("user", user_id);
  //     postData.append("username", user_name);
  //     postData.append("caption", post.caption);
  //     postData.append("add_photos", post.add_photos, post.add_photos.name);
  //     postData.append("add_location", post.add_location);
  //     postData.append("add_tags", post.add_tags);

  //     try {
  //       axios
  //         .post(baseUrl + "/post/", postData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         })
  //         .then((response) => {
  //           window.location.href = "/home/createpost";
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     event.preventDefault();
  //   };

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
              name="add_tags"
              onChange={handleChange}
              // value={post.add_tags}
            ></input>
          </div>
          <div>
            <h3 className="mb-3 font-bold">Username</h3>
            <input
              className="bg-[#101012] p-3 focus:outline-[#736ddb] rounded-[6px] w-[100%]"
              name="add_tags"
              onChange={handleChange}
              // value={post.add_tags}
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
                name="add_photos"
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                //   value={post.add_photos}
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
                // onClick={handleSubmit}
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