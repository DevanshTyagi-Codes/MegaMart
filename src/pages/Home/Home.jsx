import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button, Item, Spinner } from "../../components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

const Home = () => {
  const PromotionVideo = lazy(() => import("../../components/Video/Video"));
  const Carousel = lazy(() => import("../../components/Carousel/Carousel"));

  const status = useSelector((state) => state.auth.status);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const popularCategories = useRef(null);

  const navigateToPopularCategories = () => {
    popularCategories.current.scrollIntoView({ behavior: "smooth" });
  };

  const userNavigate = () => {
    status
      ? navigate("/category/Books/oqyIYhfjA3AYaLQ7eGED")
      : toast("Login to Buy Items") && navigate("/login");
  };

  useEffect(() => {
    const getProdcuts = async () => {
      try {
        const q = collection(db, "products");
        const querySnapshot = await getDocs(q);
        let allProducts = [];
        let allProductsId = [];
        querySnapshot.forEach((doc) => {
          allProductsId.push(doc.id);
          const keys = Object.keys(doc.data());
          allProducts.push({
            keys: keys,
            id: doc.id,
          });
        });
        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getProdcuts();
  }, []);

  return (
    <div className="w-full p-3 dark:bg-slate-900">
      <div className="flex items-center flex-col gap-2 p-3 mt-1 justify-center w-full">
        <div>
          <img
            className="h-[50vh] object-contain rounded"
            src="https://thediaryofshraddha.com/wp-content/uploads/2023/03/IMG_0375.jpg"
            alt=""
          />
        </div>
        <div className="w-full p-4 flex flex-col gap-5 justify-center items-center">
          <h2 className="text-5xl font-bold text-wrap text-center dark:text-white">
            Upgrade Yourself <br /> With Our Collection
          </h2>
          <p className="text-center md:w-[600px] mt-1 text-sm text-slate-800 dark:text-slate-300">
            Explore our extensive range of categories including books, fashion,
            electronics, grooming, home essentials, and much more.Shop now and
            experience the best in convenience and style!
          </p>
          <div className="flex gap-5">
            <Button
              className={`sm:w-[22vw] w-[45vw] text-nowrap bg-blue-600 text-white border-2 border-blue-300`}
              onClick={userNavigate}
            >
              Buy Now
            </Button>
            <Button
              onClick={navigateToPopularCategories}
              className={`sm:w-[22vw] w-[45vw] border-2 text-nowrap border-blue-300 dark:text-white`}
            >
              Explore More
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <PromotionVideo />
          </Suspense>
        </div>
        <div className="max-w-5xl m-auto mt-10 p-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Carousel />
          </Suspense>
        </div>
      </div>
      <div ref={popularCategories}>
        <h2 className="text-2xl font-bold dark:text-white">Popular Categories</h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        {products.length > 0 ? (
          products.map((product) => (
            <Item key={product.id} id={product.id} name={product.keys} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center gap-2">
            <h2 className="text-center text-3xl font-bold">Loading</h2>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
