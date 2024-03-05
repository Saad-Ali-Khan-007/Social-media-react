import React from "react";
import { ReactComponent as AllPeople } from "./assets/people_p.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8000/api";

const People = () => {
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(userData);
  return (
    <div className="overflow-y-scroll w-[100vw]  h-[100vh]">
      <div className="flex flex-wrap flex-col gap-10 mr-32 ml-32 mt-[4.5rem]">
        <div className="flex items-center gap-4">
          <AllPeople />
          <h1 className="text-[30px] font-bold">People</h1>
        </div>
        <div className="flex flex-wrap mb-8">
          {userData.map((users, index) => (
            <Link
              to={`/home/people/${users.id}`}
              key={index}
              className="flex flex-wrap m-8 w-[25%]  items-center flex-col gap-4 justify-evenly p-10 border-gray-700 border-[0.001rem]"
            >
              <img
                className="rounded-[100%]"
                width={80}
                src={users.featured_img}
              ></img>
              <p>{users.name}</p>
              <p className="text-[#877EFF]">@{users.username}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
