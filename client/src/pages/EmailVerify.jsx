import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    backendUrl,
    isLoggedin,
    userData,
    getUserData,
  } = useContext(AppContext);

  // Redirect verified users
  useEffect(() => {
    if (
      isLoggedin &&
      userData &&
      userData.isAccountVerified
    ) {
      navigate("/dashboard");
    }
  }, [isLoggedin, userData, navigate]);

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
    if (isLoading) return; // Prevent duplicate multi-clicks on slow devices
    setIsLoading(true);

    try {
      const otp = inputRefs.current
        .map((input) => input.value)
        .join("");

      // Note: Match this endpoint string exact to your backend router setup
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp },
        { withCredentials: true }
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-6 bg-slate-950">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm sm:max-w-md p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          Verify Email
        </h2>

        <p className="text-center text-sm text-white/40 mb-8">
          Enter the 6 digit OTP sent to your email
        </p>

        {/* Using standard max-w-max grid layout to keep everything securely boxed on phones */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-8 auto-cols-max">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                maxLength="1"
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-9 h-12 sm:w-12 sm:h-14 text-xl font-semibold text-center bg-white/5 text-white rounded-xl outline-none border border-white/10 focus:border-blue-500 transition-all"
                required
              />
            ))}
        </div>

        <button 
          disabled={isLoading}
          className={`w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'VERIFYING...' : 'VERIFY ACCOUNT'}
        </button>

        <p className="text-center text-xs text-white/40 mt-6">
          Check your inbox or spam folder for OTP.
        </p>
      </form>
    </div>
  );
};

export default EmailVerify;