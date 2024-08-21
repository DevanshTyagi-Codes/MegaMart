import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { RiProductHuntFill } from "react-icons/ri";
import { UserComp } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalMyProducts, setTotalMyProducts] = useState(0);

  const [showUsers, setShowUsers] = useState([]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const getProductsAndUsers = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        let productsCount = 0;
        let myProductCount = 0;

        const productsPromises = productsSnapshot.docs.map(async (doc) => {
          let keys = Object.keys(doc.data());
          const subCollectionSnapshot = await getDocs(
            collection(db, "products", doc.id, keys[0])
          );
          productsCount += subCollectionSnapshot.size;
        });

        const myProductPromises = productsSnapshot.docs.map(async (d) => {
          let keys = Object.keys(d.data());
          const myProductsSubCollection = collection(
            db,
            "products",
            d.id,
            keys[0]
          );
          const q = query(
            myProductsSubCollection,
            where("userId", "==", userData)
          );
          const querySnapshot = await getDocs(q);
          myProductCount += querySnapshot.size;
        });

        await Promise.all(productsPromises); // Wait for all promises to resolve
        await Promise.all(myProductPromises);
        setTotalProducts(productsCount);
        setTotalMyProducts(myProductCount);

        // Fetching Users
        const usersSnapshot = await getDocs(collection(db, "Users"));
        setTotalUsers(usersSnapshot.size);
      } catch (error) {
        console.log(error);
      }
    };

    getProductsAndUsers();
  }, [userData]);

  const fetchUsers = async () => {
    const users = collection(db, "Users");
    const usersSnapshot = await getDocs(users);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    setShowUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full min-h-[70vh] p-4 dark:bg-slate-900 dark:text-white overflow-auto">
      <div className="grid grid-cols-2 md:flex gap-3 justify-center ">
        <div className="h-[20vh] w-[40vw] rounded border-2 sm:p-2 p-1 flex flex-col gap-2 justify-center items-center">
          <FaUser className="sm:text-5xl text-2xl cursor-pointer" />
          <h2 className="text-xl font-semibold  cursor-pointer">
            Total Users:{" "}
            <span className="text-lg font-medium">{totalUsers}</span>
          </h2>
        </div>
        <div
          className="h-[20vh] w-[40vw] rounded border-2 p-2 flex flex-col gap-2 justify-center items-center"
          onClick={() => navigate("/admin/productsList")}
        >
          <AiOutlineProduct className="sm:text-5xl text-2xl cursor-pointer" />
          <h2 className="text-xl font-semibold cursor-pointer">
            Total Products:{" "}
            <span className="text-lg font-medium">{totalProducts}</span>
          </h2>
        </div>
        <div
          className="h-[20vh] w-[40vw] rounded border-2 p-2 flex flex-col gap-2 justify-center items-center"
          onClick={() => navigate("/admin/addproducts")}
        >
          <img
            className="sm:h-14 sm:w-14 w-10 h-10 cursor-pointer"
            src="/add.png"
            alt=""
          />
          <h2 className="text-xl font-semibold cursor-pointer">Add Products</h2>
        </div>
        <div
          className="h-[20vh] w-[40vw] rounded border-2 p-2 flex flex-col gap-2 justify-center items-center"
          onClick={() => navigate("/admin/myproducts")}
        >
          <RiProductHuntFill className="sm:text-5xl text-2xl cursor-pointer"  />
          <h2 className="text-xl font-semibold cursor-pointer">
            My Products:{" "}
            <span className="text-lg font-medium">{totalMyProducts}</span>
          </h2>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="font-extrabold text-lg text-center">User Details</h2>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-4 p-3 font-bold">
            <span>S.no</span>
            <span>Name</span>
            <span>Email</span>
            <span>Created At</span>
          </div>
          <hr />
          <div className="flex flex-col gap-2 h-[35vh] overflow-auto">
            {showUsers.length > 0 ? (
              showUsers.map((user, index) => (
                <UserComp
                  key={index}
                  Name={user.Name}
                  email={user.email}
                  date={user.date}
                  index={index}
                />
              ))
            ) : (
              <div className="mt-4">
                <h2 className="text-center font-bold text-xl">
                  Currently no user is registered:{" "}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
