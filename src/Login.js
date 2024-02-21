import { ReactComponent as Logo } from "./assets/logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    const userLoginForm = new FormData();
    userLoginForm.append("email", userLogin.email);
    userLoginForm.append("password", userLogin.password);

    try {
      axios.post(baseUrl + "/user/login/", userLoginForm).then((response) => {
        console.log(response.data);
        if (response.data.bool === true) {
          localStorage.setItem("userLoginStatus", true);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("user_name", response.data.user_name);
          window.location.href = "/home/allpost";
        } else {
          setErrorMsg("Inavlid Email or Password!!");
        }
      });
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };

  const userLoginStatus = localStorage.getItem("userLoginStatus");
  if (userLoginStatus === "true") {
    window.location.href = "/home/allpost";
  }

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
      {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
      <form className="flex flex-col gap-2 w-[30%]">
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={userLogin.name}
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={userLogin.password}
          className="p-3 rounded-md bg-[#1F1F22] focus:outline-[#877EFF]"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#877EFF] p-3 rounded-md mt-4"
        >
          Login
        </button>
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
