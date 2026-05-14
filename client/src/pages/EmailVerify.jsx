// EmailVerify.jsx

import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const {
    backendUrl,
    isLoggedin,
    userData,
    getUserData,
  } = useContext(AppContext);

  // Send OTP once
  useEffect(() => {
    const sendOtp = async () => {
      try {
        if (
          isLoggedin &&
          userData &&
          !userData.isAccountVerified
        ) {
          const { data } = await axios.post(
            backendUrl + "/api/auth/send-verify-otp"
          );

          if (data.success) {
            toast.success("OTP sent to your email");
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    sendOtp();
  }, []);

  // Redirect if verified
  useEffect(() => {
    if (
      isLoggedin &&
      userData &&
      userData.isAccountVerified
    ) {
      navigate("/dashboard");
    }
  }, [isLoggedin, userData]);

  const handleInput = (e, index) => {
    if (
      e.target.value.length > 0 &&
      index < inputRefs.current.length - 1
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const otp = inputRefs.current
        .map((input) => input.value)
        .join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-6 bg-slate-950">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-10 rounded-3xl bg-white/[0.02]"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-3">
          Verify Email
        </h2>

        <p className="text-center text-white/40 mb-8">
          Enter the 6 digit OTP
        </p>

        <div className="flex justify-between gap-2 mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                maxLength="1"
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-12 h-14 text-center bg-white/5 text-white rounded-xl outline-none"
                required
              />
            ))}
        </div>

        <button className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition">
          VERIFY ACCOUNT
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;