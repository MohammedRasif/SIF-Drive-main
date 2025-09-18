import React, { useState, useEffect } from "react";
import { FaLessThan, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../shared/Input";
import LoginTop from "./LoginTop";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/features/baseApi";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgetPassword, { isLoading, isError, isSuccess, error: mutationError }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please Enter Your Email");
      return;
    }
    setError("");
    try {
      await forgetPassword({ email }).unwrap();
    } catch (err) {
      console.error("Failed to send OTP:", err);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered", { isSuccess, isError, mutationError });
    if (isSuccess) {
      toast.success("OTP sent successfully to your email!", {
        position: "top-right",
        autoClose: 2000,
      });
      localStorage.setItem("resetEmail", email);
      setEmail("");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
    }
    if (isError && mutationError) {
      console.log("Mutation Error:", mutationError);

      const errorMessage = mutationError?.data?.email?.[0] || "Failed to send OTP. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [isSuccess, isError, mutationError, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden w-full h-full">
        {/* Left Illustration Section */}
        <div className="w-full md:w-1/2 bg-indigo-50 p-8 items-center justify-center hidden md:flex">
          <div className="text-center">
            <img
              src="/forgot.png"
              alt="SLF-Drive Logo"
              className="mx-auto mb-4 w-full"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div>
              <img src="/logoName.png" alt="" />
              <div className="my-5">
                <Link
                  to="/login"
                  className="flex items-center text-gray-500 hover:text-gray-700 gap-4 text-2xl md:text-3xl"
                >
                  <FaLessThan /> <p>Forgot Password</p>
                </Link>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the email address associated with your account. We'll
                  send you an OTP to your email.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-[#0023CF] to-[#071352] text-white p-2 rounded-md hover:bg-indigo-700 hover:cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;