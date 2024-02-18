import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-[100vh]">
      <div className="flex flex-col items-center">
        <Logo className="mb-7" />
        <h1 className="text-4xl font-bold mb-3">Login to your account</h1>
        <p className="text-[#877EFF] text-[18px]">
          To use snapgram please enter your details
        </p>
      </div>
      <form className="flex flex-col gap-2 w-[30%]">
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
        <button className="bg-[#877EFF] p-3 rounded-md mt-4">Login</button>
      </form>
      <div className="flex flex-col items-center">
        <p>
          Don't have an account ?{" "}
          <Link to="/" className="text-[#877EFF]">
            {" "}
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
