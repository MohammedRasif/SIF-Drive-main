import React from "react";

function LoginTop() {
  return (
    <div className="text-center p-6">
      <div className="flex justify-center mb-4">
        <img src="/logoName.png" alt="Logo" className="h-12 md:h-20" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl text-black font-semibold">Hello, Welcome!</h1>
        <p className="text-sm text-gray-500">
          Please Enter Your Details Below to Continue
        </p>
      </div>
    </div>
  );
}

export default LoginTop;
