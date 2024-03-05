import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    featured_img: "",
    status: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    const userForm = new FormData();
    userForm.append("name", user.name);
    userForm.append("username", user.username);
    userForm.append("email", user.email);
    userForm.append("password", user.password);
    userForm.append("featured_img", user.featured_img);

    try {
      axios.post(baseUrl + "/user/", userForm).then((response) => {
        setUser({
          name: "",
          username: "",
          email: "",
          password: "",
          featured_img: "",
          status: "success",
        });
      });
    } catch (error) {
      setError(error.response.data);
      setUser({ status: "error" });
    }
    event.preventDefault();
  };
  console.log(error);

  const userLoginStatus = localStorage.getItem("userLoginStatus");
  if (userLoginStatus === "true") {
    window.location.href = "/home/allpost";
  }

  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-[100vh]">
      <div className="flex flex-col items-center">
        <Logo className="mb-7" />
        <h1 className="text-4xl font-bold mb-3">Create a new account</h1>
        <p className="text-[#877EFF] text-[18px]">
          To use snapgram please enter your details
        </p>
      </div>
      {error == "ERR_BAD_REQUEST" && (
        <p className="text-center text-red-500">
          User with this email already exist Registered
        </p>
      )}
      {user.status === "success" && (
        <p className="text-center text-green-500">
          User Successfuly Registered
        </p>
      )}
      {user.status === "error" && (
        <p className="text-center text-red-500">Something went Wrong</p>
      )}
      <form className="flex flex-col gap-2 w-[30%]">
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={user.name}
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={user.username}
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={user.email}
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        {/* <Link to="/home"> */}
        <button
          onClick={handleSubmit}
          className="bg-[#877EFF] p-3 rounded-md mt-4 w-[100%]"
        >
          Register
        </button>
        {/* </Link> */}
      </form>
      <div className="flex flex-col items-center">
        <p>
          Already have an account ?{" "}
          <Link to="/login" className="text-[#877EFF]">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
