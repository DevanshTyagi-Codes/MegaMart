import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button } from "../index";

const CartItem = ({
  image,
  name,
  Description,
  quantity,
  price,
  increaseHandler,
  decreaseHandler,
  deleteHandler
}) => {
  return (
    <div className="w-full ">
      <main className=" p-2 gap-2 w-full flex flex-col items-center md:grid grid-cols-[1.7fr_3fr_0.1fr]">
        <div>
          <img src={image} className="w-44 h-44 rounded" alt="" />
        </div>
        <div className="md:block flex flex-col items-center gap-1">
          <p className="font-medium mb-3">
            <span className="font-bold">{name}</span>
            {Description}
          </p>
          <div className="flex gap-5 items-center">
            <div
              className="hover:bg-slate-200 cursor-pointer rounded-full h-6 w-6 flex justify-center items-center duration-75"
              onClick={increaseHandler}
            >
              <FaPlus />
            </div>
            <span>Qty: {quantity}</span>
            <div
              className="hover:bg-slate-200 cursor-pointer rounded-full h-6 w-6 flex justify-center items-center duration-75"
              onClick={decreaseHandler}
            >
              <FaMinus />
            </div>
          </div>
          <div className="mt-2">
            <Button
              className={`w-[200px] text-nowrap bg-blue-600 text-white`}
              onClick={deleteHandler}
            >
              Remove
            </Button>
          </div>
        </div>
        <div>
          <span className="font-semibold">&#8377;{price}</span>
        </div>
      </main>
      <hr />
    </div>
  );
};

export default CartItem;
