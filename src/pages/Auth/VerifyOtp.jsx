import React, { useState, useRef, useEffect } from "react";
import { FaLessThan } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useOtpVerifyMutation } from "../../redux/features/baseApi";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [verifyOtp, { isLoading, isError, isSuccess }] = useOtpVerifyMutation();
  const navigate = useNavigate();

  // Retrieve email from localStorage
  const email = localStorage.getItem("resetEmail") || "";

  // Handle mutation feedback with toast and navigation
  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP verified successfully!");
      navigate("/new-password");
    }
    if (isError) {
      toast.error("Invalid OTP. Please try again.");
      setError("Invalid OTP. Please try again.");
    }
  }, [isSuccess, isError, navigate]);

  // Focus next input after typing
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); 
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // Handle paste of 6-digit code
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputsRef.current[5].focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter a 6-digit OTP code");
      toast.error("Please enter a 6-digit OTP code");
      return;
    }
    setError("");
    try {
      await verifyOtp({ email, otp_code: code }).unwrap();
    } catch (err) {
      
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden w-full h-full ">
        {/* Left Illustration Section */}
        <div className="w-full md:w-1/2 bg-indigo-50 p-8 items-center justify-center hidden md:flex">
          <div className="text-center">
            <img
              src="/otp.png"
              alt="SLF-Drive Logo"
              className="mx-auto mb-4 w-full"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div>
              <img src="/logoName.png" alt="Logo" />
              <div className="my-5">
                <Link
                  to="/forgot-password"
                  className="flex items-center text-gray-500 hover:text-gray-700 gap-4 text-2xl md:text-3xl"
                >
                  <FaLessThan /> <p>Verify OTP</p>
                </Link>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 6-digit verification code sent to your email.
                </p>
              </div>
            </div>

            <div onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-2 justify-between" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl text-indigo-400 border border-indigo-50 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    inputMode="numeric"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-400">Didn’t receive code?</p>{" "}
                <span className="text-indigo-400 underline hover:cursor-pointer">
                  Resend
                </span>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-[#0023CF] to-[#071352] text-white p-2 rounded-md hover:bg-indigo-700 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;