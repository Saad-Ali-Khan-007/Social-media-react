import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8000/api";
const PeopleDetail = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState();

  const current_user_id = localStorage.getItem("user_id");

  const getData = async () => {
    const response = await axios.get(`${baseUrl}/user/${user_id}`);
    setUser(response.data);
  };

  useEffect(() => {
    document.title = "User Details";
    getData();
  }, []);

  return (
    <div className="overflow-y-scroll w-[100vw] h-[100vh] ">
      <div className="flex items-center justify-between ml-[6rem] mr-[6rem] mt-[4.5rem] mb-[3rem]">
        <div className="flex items-center gap-5">
          <div>Logo</div>
          <div>
            <h1>{user?.name}</h1>
            <p className="text-[#6761dd]">@{user?.username}</p>
          </div>
        </div>
        {current_user_id === user_id ? (
          <Link
            to="/home/editprofile"
            className="bg-[#6761dd] text-center p-3 rounded-[6px] w-[15%]"
          >
            Edit Profile
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default PeopleDetail;
