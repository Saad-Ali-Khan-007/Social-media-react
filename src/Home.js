import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div className="flex ">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
