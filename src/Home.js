import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
