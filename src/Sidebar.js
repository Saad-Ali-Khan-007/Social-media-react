import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as Home } from "./assets/home.svg";
import { ReactComponent as Gallery } from "./assets/gallery-add.svg";
import { ReactComponent as Bookmark } from "./assets/bookmark.svg";
import { ReactComponent as People } from "./assets/people.svg";
import { ReactComponent as Wallpaper } from "./assets/wallpaper.svg";
import { ReactComponent as Logout } from "./assets/logout.svg";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="flex flex-col  bg-[#09090A] h-[100vh]">
      <Link className="ml-6 mr-12 mt-10 mb-8">
        <Logo />
      </Link>
      <Link className="flex gap-3 ml-6 mr-12 mb-8">
        <div>
          <p>Logo</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Saad Ali Khan</h2>
          <p className="text-[#877EFF]">@saadalikhan</p>
        </div>
      </Link>
      <div>
        <Link className="flex gap-4  ml-8 mr-12 mb-8">
          <Home />

          <h2 className="text-[18px]">Home</h2>
        </Link>
        <Link className="flex gap-4 ml-8 mr-12 mb-8">
          <Wallpaper />
          <h2 className="text-[18px]">Explore</h2>
        </Link>
        <Link className="flex gap-4 ml-8 mr-12 mb-8">
          <People />
          <h2 className="text-[18px]">People</h2>
        </Link>
        <Link className="flex gap-4 ml-8 mr-12 mb-8">
          <Bookmark />
          <h2 className="text-[18px]">Saved</h2>
        </Link>
        <Link className="flex gap-4 ml-8 mr-12 mb-8">
          <Gallery />
          <h2 className="text-[18px]">CreatePost</h2>
        </Link>
      </div>
      <Link className="flex gap-4 ml-8 mt-44 mr-12 mb-8">
        <Logout />
        <h2 className="text-[18px]">Logout</h2>
      </Link>
    </div>
  );
};

export default Sidebar;
