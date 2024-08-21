import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../index";
import { signOut, deleteUser } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as userLogout } from "../../store/authSlice";
import { FaUser } from "react-icons/fa6";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

const Sidebar = ({ isSideBarOpen, onClose, className }) => {
  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState([]);

  const fetchUserData = async () => {
    if (status !== null && userData) {
      const userRef = doc(db, "Users", userData);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    } else {
      setUser([]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [status, userData]);

  const logout = async () => {
    if (status) {
      await signOut(auth);
      dispatch(userLogout());
      toast.success("User LoggedOut");
      navigate("/");
      onClose();
      setUser([]);
    } else {
      navigate("/login");
      onClose();
    }
  };

  const deleteUserAccount = async () => {
    if (status) {
      const currentUser = auth.currentUser;
      await deleteUser(currentUser);
      await deleteDoc(doc(db, "Users", userData));
      toast.success("Account deleted successfully!");
      dispatch(userLogout());
      navigate("/");
      onClose();
      setUser([]);
    } else {
      navigate("/login");
      onClose();
    }
  };

  if (!isSideBarOpen) return null;
  return (
    <div>
      <div
        className={`min-h-[100vh] w-[75vw] md:w-[50vw] lg:w-[40vw] bg-neutral-300 p-4 ${className} flex flex-col justify-evenly dark:text-black dark:bg-neutral-600 z-10`}
      >
        <AiOutlineClose
          className="text-2xl absolute top-6 right-4 cursor-pointer"
          onClick={onClose}
        />
        <div>
          <Button
            className={`bg-blue-600 text-white dark:bg-blue-800`}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </div>
        <div className="w-full h-[40vh] flex justify-center flex-col gap-5 items-center">
          <div className="w-32 h-32 border-2 border-blue-400 rounded-full flex items-center justify-center dark:border-blue-700">
            <FaUser className="text-5xl font-semibold" />
          </div>
          <div>
            <h2>
              <span className="text-lg font-medium">Welcome: </span>{" "}
              <span className="dark:text-white text-xl font-bold">
                {user.Name}
              </span>
            </h2>
          </div>
        </div>
        <div>
          <div>
            <span className="text-lg font-medium">Email: </span>
            <span className="dark:text-white">{user.email}</span>
          </div>
          <div>
            <span className="text-lg font-medium">Created At: </span>
            <span className="dark:text-white">
              {user.date?.replace("GMT", "").split(" ").slice(0, 4).join(" ")}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Button
            className={`bg-blue-600 text-white dark:bg-blue-800`}
            onClick={logout}
          >
            {status ? "Logout" : "Login"}
          </Button>{" "}
          {status ? (
            <Button
              className={`bg-blue-600 text-white dark:bg-blue-800`}
              onClick={deleteUserAccount}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
