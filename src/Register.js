import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
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
      <form className="flex flex-col gap-2 w-[30%]">
        <label>Name</label>
        <input
          type="text"
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Username</label>
        <input
          type="text"
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Email</label>
        <input
          type="email"
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Password</label>
        <input
          type="password"
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <button className="bg-[#877EFF] p-3 rounded-md mt-4">Register</button>
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
