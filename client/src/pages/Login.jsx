// Login.jsx

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } =
    useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      // SIGN UP
      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password }
        );

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();

          toast.success(data.message);
          navigate("/email-verify");
        } else {
          toast.error(data.message);
        }
      }

      // LOGIN
      else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password }
        );

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();

          toast.success(data.message);

          if (data.user?.isAccountVerified) {
            navigate("/dashboard");
          } else {
            navigate("/email-verify");
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-6 pt-32 pb-20 overflow-y-auto bg-slate-950">
      <div className="relative z-10 w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl">

        <h2 className="text-3xl font-black text-white text-center mb-2 uppercase">
          {state === "Sign Up" ? "CREATE ACCOUNT" : "WELCOME BACK"}
        </h2>

        <p className="text-white/40 text-center text-sm mb-10">
          {state === "Sign Up"
            ? "Create your secure account."
            : "Login to continue."}
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">

          {state === "Sign Up" && (
            <div className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-2xl">
              <img src={assets.person_icon} className="w-5" />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          )}

          <div className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-2xl">
            <img src={assets.mail_icon} className="w-5" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-2xl">
            <img src={assets.lock_icon} className="w-5" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-xs text-blue-400 text-right cursor-pointer"
            >
              Forgot password?
            </p>
          )}

          <button className="mt-4 w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition">
            {state === "Sign Up" ? "SIGN UP" : "LOGIN"}
          </button>
        </form>

        <p className="mt-8 text-center text-white/40 text-sm">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
            className="text-blue-500 ml-2 cursor-pointer"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;