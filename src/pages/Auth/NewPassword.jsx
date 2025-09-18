import React, { useState, useEffect } from "react";
import { FaLessThan, FaLock } from "react-icons/fa";
import Input from "../../shared/Input";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUpdatePasswordMutation } from "../../redux/features/baseApi";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [updatePassword, { isLoading, isError, isSuccess }] = useUpdatePasswordMutation();
  const navigate = useNavigate();

  // Retrieve email from localStorage
  const email = localStorage.getItem("resetEmail") || "";

  // Handle mutation feedback with toast and navigation
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!");
      localStorage.removeItem("resetEmail"); // Remove resetEmail from localStorage
      navigate("/login");
    }
    if (isError) {
      toast.error("Failed to update password. Please try again.");
      setError("Failed to update password. Please try again.");
    }
  }, [isSuccess, isError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== password) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    setError("");

    // Call the mutation with the specified payload format
    try {
      await updatePassword({
        email,
        new_password: newPassword,
        confirm_password: password,
      }).unwrap();
    } catch (err) {
      // Error handling is managed in useEffect
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden w-full h-full">
        {/* Left Illustration Section */}
        <div className="w-full md:w-1/2 bg-indigo-50 p-8 items-center justify-center hidden md:flex">
          <div className="text-center">
            <img
              src="/newPass.png"
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
                  <FaLessThan /> <p>Update Password</p>
                </Link>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                name="newPassword"
              />
              <Input
                label="Confirm Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Confirm Password"
                name="confirmPassword"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-[#0023CF] to-[#071352] text-white p-2 rounded-md hover:bg-indigo-700 hover:cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewPassword;