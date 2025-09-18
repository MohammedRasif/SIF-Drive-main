import React, { useState, useRef } from "react";
import { FaLessThan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/features/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [veriEmail, { isLoading, isError, isSuccess, error: mutationError }] = useVerifyEmailMutation();
  const navigate = useNavigate();

  // Focus next input after typing
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter a 6-digit OTP code");
      toast.error("Please enter a 6-digit OTP code", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      setError("Email not found. Please sign up again.");
      toast.error("Email not found. Please sign up again.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setError("");

    try {
      // Call the verifyEmail mutation with OTP and email
      const response = await veriEmail({ otp_code: code, email: storedEmail }).unwrap();

      // Store access_token and refresh_token in localStorage
      if (response.access && response.refresh) {
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
      }

      // Show success toast
      toast.success("OTP verified successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset OTP inputs
      setOtp(Array(6).fill(""));

      // Redirect to login or another page after successful verification
      navigate("/");

    } catch (err) {
      // Handle errors
      if (err.data) {
        // Parse error response and show specific error messages
        const errorMessages = Object.entries(err.data)
          .map(([field, errors]) => {
            // Convert field name to a more user-friendly format
            const fieldName = field
              .replace("_", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            return `${fieldName}: ${errors.join(", ")}`;
          })
          .join("\n");

        toast.error(errorMessages || "OTP verification failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden w-full h-full">
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
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 6-digit verification code sent to your email.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-[#0023CF] to-[#071352] text-white p-2 rounded-md ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerifyOtp;