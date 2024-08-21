import React, { useEffect, useState } from "react";
import { Button, CartItem, Input, Modal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addedToCart, decrement, removeFromCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [totalValue, setTotalValue] = useState(0);
  let subTotal = 0;
  let totalQuantity = 0;
  cartItems.forEach((i) => {
    subTotal += i.quantity * Number(i.price.replace(",", ""));
    totalQuantity += i.quantity;
  });

  const shippingCharges = subTotal < 1490 ? 299 : 0;
  const discount = subTotal > 2000 ? (subTotal * 0.09).toFixed() : 0;

  useEffect(() => {
    setTotalValue(subTotal + shippingCharges - discount - couponDiscount);
  }, [shippingCharges, subTotal, discount, couponDiscount]);

  const couponConfig = {
    MART10: { minOrderValue: 2000, discountPercent: 0.1 },
    MEGA: { minOrderValue: 1500, discountPercent: 0.1 },
    MART15: { minOrderValue: 2500, discountPercent: 0.15 },
  };

  const checkCouponCode = () => {
    if (!couponCode) {
      toast("Enter Coupon Code First!");
      return;
    }

    const coupon = couponConfig[couponCode];

    if (coupon) {
      if (totalValue > coupon.minOrderValue) {
        setIsModalOpen(false);
        setCouponDiscount((totalValue * coupon.discountPercent).toFixed());
        toast.success(`${couponCode} Added!`);
      } else {
        toast(`Total value is less than ${coupon.minOrderValue}`);
      }
    } else {
      toast("Invalid Coupon Code");
    }
  };

  const addCoupon = (text) => {
    setCouponCode(text);
  };

  const dispatch = useDispatch();

  const incrementHandler = (id) => dispatch(addedToCart({ id }));
  const decrementHandler = (id) => dispatch(decrement(id));
  const deleteHandler = (id) => dispatch(removeFromCart(id));

  return cartItems.length > 0 ? (
    <div className="flex flex-col gap-2 md:grid md:grid-cols-[4fr_1fr] p-5 min-h-[73vh] overflow-auto dark:bg-slate-900 dark:text-white">
      <div className="flex flex-col gap-7 p-3">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-bold text-xl">Shopping Cart</h2>
          <span className="font-semibold text-lg">Price</span>
        </div>
        <hr className="border-t-2" />
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            name={item.name}
            price={item.price}
            Description={item.Description}
            quantity={item.quantity}
            image={item.image}
            decreaseHandler={() => decrementHandler(item.id)}
            increaseHandler={() => incrementHandler(item.id)}
            deleteHandler={() => deleteHandler(item.id)}
          />
        ))}
        <div>
          <h3 className="font-semibold text-lg text-right">
            SubTotal({totalQuantity} items): &#8377;{subTotal}
          </h3>
        </div>
      </div>
      <aside className="w-full h-[50vh] py-4 px-2 sticky top-0 bg-zinc-100 flex flex-col gap-3 dark:bg-slate-800 dark:text-white">
        <p className="text-xs">PRICE DETAILS ({cartItems.length} items) </p>
        <div className="flex justify-between items-center">
          <span className="text-sm">Total MRP</span>
          <span className="text-sm">&#8377;{subTotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Discount on MRP</span>
          <span className="text-sm">&#8377;{discount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Coupon Discount</span>
          <span className="text-sm">
            <span
              className="text-xs text-orange-400 cursor-pointer"
              onClick={toggleModal}
            >
              {couponDiscount === 0 ? "Apply Coupon" : `₹${couponDiscount}`}
            </span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Shipping Fee</span>
          <span className="text-sm">
            {shippingCharges === 0 ? "Free" : `₹${shippingCharges}`}
          </span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Amount</span>
          <span className="font-semibold">&#8377;{totalValue}</span>
        </div>
        <div className="flex justify-center mt-1">
          <Button className={`w-[37vw] md:w-[15vw] text-nowrap bg-blue-600 text-white `}>
            Place Order
          </Button>
        </div>
      </aside>
      <Modal isModalOpen={isModalOpen} onClose={toggleModal} className={`xl:w-[30vw] md:w-[50vw] w-[80vw]`}>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Apply a Coupon</h2>
          <hr />
          <Input
            className={`mx-2`}
            placeholder="Enter the Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          />
          <hr />
          <div className="overflow-auto">
            <div className=" p-3 flex flex-col gap-2 overflow-auto">
              <p
                className="h-10 text-white cursor-pointer w-28 rounded bg-blue-500 flex justify-center items-center"
                onClick={(e) => addCoupon(e.target.innerText)}
              >
                MEGA
              </p>
              <p className="font-semibold">Save upto &#8377;150.</p>
              <p className="text-sm">
                10% off on the mininum purchase of Rs.1500.
              </p>
            </div>
            <div className=" p-3 flex flex-col gap-2">
              <p
                className="h-10 text-white cursor-pointer w-28 rounded bg-blue-500 flex justify-center items-center"
                onClick={(e) => addCoupon(e.target.innerText)}
              >
                MART10
              </p>
              <p className="font-semibold">Save upto &#8377;200.</p>
              <p className="text-sm">
                10% off on the mininum purchase of Rs.2000.
              </p>
            </div>
            <div className=" p-3 flex flex-col gap-2 overflow-auto">
              <p
                className="h-10 text-white cursor-pointer w-28 rounded bg-blue-500 flex justify-center items-center"
                onClick={(e) => addCoupon(e.target.innerText)}
              >
                MART15
              </p>
              <p className="font-semibold">Save upto &#8377;375.</p>
              <p className="text-sm">
                15% off on the mininum purchase of Rs.2500.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between gap-5 px-2 bg-slate-100 h-24 items-center">
            <Button
              className={`lg:w-[10vw] w-[30vw]  text-nowrap bg-blue-600 text-white `}
              onClick={checkCouponCode}
            >
              Apply
            </Button>
            <Button
              className={`lg:w-[10vw]  w-[30vw]  text-nowrap bg-blue-600 text-white `}
              onClick={() => {
                setCouponDiscount(0);
                setCouponCode("");
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div className="w-full min-h-[73vh] flex flex-col justify-center items-center p-5 gap-5 dark:bg-slate-900 dark:text-white">
      <h2 className="font-bold text-xl text-center">
        No items are present in the cart
      </h2>
      <Link to={`/`}>
        <Button
          className={`sm:w-[22vw] w-[45vw] text-nowrap bg-blue-600 text-white border-2 border-blue-300`}
        >
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default Cart;
