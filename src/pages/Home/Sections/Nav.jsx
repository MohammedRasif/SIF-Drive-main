import React from "react";
import { Link } from "react-router";

function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-20 lg:px-40 py-4 bg-white">
      <div className="flex items-center">
        <img
          src="/logoName.png"
          alt="SLF-Drive"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div>
        <Link
          className="bg-[#0B2088] text-white px-4 py-2 rounded-md text-base font-medium hover:bg-[#0A1B70] transition-colors"
          to="/login"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
