import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { login as userLogin } from "../../store/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const login = async (data) => {
    try {
      const session = await signInWithEmailAndPassword(
        auth,
        data.userEmail,
        data.password
      );
      if (session) {
        const user = auth.currentUser;
        toast.success("User LoggedIn Successfully!");
        if (user) dispatch(userLogin(user.uid));
        navigate(`/`);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
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
              onSubmit={handleSubmit(login)}
              className="flex justify-center items-center flex-col gap-1 mt-5 relative"
            >
              <Input
                {...register("userEmail", {
                  required: {
                    value: true,
                    message: "This is a required field",
                  },
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                className={`border-black w-[70vw] md:w-[400px]`}
                label="Email"
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
                type={isPasswordVisible ? "text" : "password"}
                className={`border-black w-[70vw] md:w-[400px]`}
                label="Password"
              />
              {isPasswordVisible ? (
                <FaRegEye
                  className="absolute top-[115px] right-4 text-lg cursor-pointer dark:text-black"
                  onClick={togglePassword}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute top-[115px] right-4 text-lg cursor-pointer dark:text-black"
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
                disabled={isSubmitting}
              >
                Login
              </Button>
            </form>
            <span className="text-center mt-2">
              Create a new account!
              <Link to="/signup" className="underline text-blue-600">
                signup
              </Link>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
