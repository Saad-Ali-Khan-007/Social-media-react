import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Logout from "./Logout";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Main = () => {
  return (
    <div className="bg-black h-[100%] text-white">
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}>
          <Route path="allpost" element={<Posts />}></Route>
          <Route path="createpost" element={<CreatePost />}></Route>
        </Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
