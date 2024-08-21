import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { login as userLogin } from "../../store/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPasscode, setUserPasscode] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const signUp = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPasscode);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Name: userName,
          id: user.uid,
          date: new Date().toUTCString(),
        });
      }
      toast.success("User registered successfully!");
      if (user) dispatch(userLogin(user.uid));
      navigate("/adminDashboard");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div className=" w-full min-h-[85vh] flex items-center justify-center p-3 dark:bg-slate-900 dark:text-white">
      {isSubmitting ? (
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-center text-3xl font-bold">Loading</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center justify-center">
            <img src="./logo.png" className="w-16 h-16 rounded-md" alt="" />
            <span className="font-semibold text-lg">Mega Mart.</span>
          </div>
          <form
            onSubmit={handleSubmit(signUp)}
            className="flex justify-center items-center flex-col gap-1 mt-5 relative"
          >
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "This is the required field",
                },
              })}
              className={`border-black w-[70vw] md:w-[400px]`}
              label="Name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.name && (
              <div className="text-xs text-red-500">{errors.name.message}</div>
            )}
            <Input
              {...register("userEmail", {
                required: {
                  value: true,
                  message: "This is a required field",
                },
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              className={`border-black w-[70vw] md:w-[400px]`}
              label="Email"
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {errors.userEmail && (
              <div className="text-xs text-red-500">
                {errors.userEmail.message}
              </div>
            )}
            <Input
              {...register("password", {
                required: {
                  value: true,
                  message: "This is a required field",
                },
                minLength: { value: 6, message: "Password is too short" },
              })}
              className={`border-black w-[70vw] md:w-[400px]`}
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              value={userPasscode}
              onChange={(e) => setUserPasscode(e.target.value)}
            />
            {isPasswordVisible ? (
              <FaRegEye
                className="absolute top-[190px] right-4 text-lg cursor-pointer dark:text-black"
                onClick={togglePassword}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-[190px] right-4 text-lg cursor-pointer dark:text-black"
                onClick={togglePassword}
              />
            )}
            {errors.password && (
              <div className="text-xs text-red-500">
                {errors.password.message}
              </div>
            )}
            <Button
              className={`md:w-[17vw] w-[45vw] mt-2 bg-blue-600 text-white border-2 border-blue-300`}
            >
              SignUp
            </Button>
          </form>
          <span className="text-center mt-2">
            Already have an account?
            <Link to="/login" className="underline text-blue-600">
              login
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default SignUp;
