import React from "react";
import { Input, Sidebar, ThemeBtn } from "../index";
import { FiSearch } from "react-icons/fi";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const Navbar = ({ changeTheme }) => {
  const status = useSelector((state) => state.auth.status);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  function checkStatus() {
    status ? navigate("/cart") : navigate("/login");
  }

  function checkAdmin() {
    status
      ? toast.success("You are at the Admin page") &&
        navigate("/adminDashboard")
      : toast("Login to go to the Admin page") && navigate("/login");
  }

  function toggleSidebar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <nav className="bg-neutral-100 w-full h-[7vh] shadow-sm dark:bg-slate-800 dark:text-white relative">
      <div className="w-full h-full flex justify-between items-center px-[2px] sm:px-6 py-1">
        <div className="flex items-center gap-1">
          <img className="w-10 h-10 rounded-lg" src="/logo.png" alt="" />
          <span className="hidden sm:block font-semibold text-lg text-nowrap">
            MegaMart
          </span>
        </div>
        <div className="relative">
          <Input className={`w-[40vw]`} placeholder="Search Anything" />
          <FiSearch className="hidden sm:block absolute top-2 right-3 md:right-7 cursor-pointer text-2xl" />
        </div>
        <div className="flex gap-3 h-full relative items-center">
          <ThemeBtn onChange={changeTheme} />
          <FaUserCircle
            className="text-2xl cursor-pointer"
            onClick={toggleSidebar || fetchUserData}
          />
          <div onClick={checkStatus}>
            <IoCart className="text-2xl cursor-pointer" />
            <span className="absolute cursor-pointer w-5 h-5 bg-red-400 flex items-center justify-center rounded-full top-1 right-7 text-xs text-white">
              {cartItems.length}
            </span>
          </div>
          <RiAdminFill
            onClick={checkAdmin}
            className="text-2xl cursor-pointer"
          />
        </div>
        <Sidebar
          className={`absolute top-0 right-0`}
          isSideBarOpen={isSideBarOpen}
          onClose={toggleSidebar}
        />
      </div>
      <Toaster />
    </nav>
  );
};

export default Navbar;
