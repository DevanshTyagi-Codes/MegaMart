import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { getDocs, collection, doc } from "firebase/firestore";
import { ProductItem, Spinner } from "../../components";
import { addedToCart } from "../../store/cartSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


const CategoryItem = () => {
  const { slug } = useParams();
  const { id } = useParams();

  const dispatch = useDispatch();

  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const cartAdded = (options) => {
    if (status) {
      toast.success("Added to cart!");
      dispatch(addedToCart(options));
    } else{
      toast("Please login to add item in the cart!")
      navigate("/login")
    }
  };

  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productDocRef = doc(db, "products", id);

        const CollectionRef = collection(productDocRef, slug);

        const querySnapshot = await getDocs(CollectionRef);
        let allCategoryProducts = [];
        querySnapshot.forEach((doc) => {
          allCategoryProducts.push(doc.data());
        });
        setCategoryProducts(allCategoryProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // console.log(categoryProducts);
  }, [categoryProducts]);

  return categoryProducts.length > 0 ? (
    <div className="dark:bg-slate-900 text-white">
      <div className="my-3 text-center">
        <h2 className="font-bold text-xl">{slug}</h2>
      </div>
      <div className="w-full min-h-[73vh] overflow-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {categoryProducts.map((product, index) => (
          <ProductItem
            key={index}
            image={product.image}
            name={product.name}
            Description={product.Description}
            price={product.price}
            handler={cartAdded}
            id={product.id}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full min-h-[73vh] dark:bg-slate-900 dark:text-white flex justify-center items-center gap-1 h-32">
       <Spinner className={`h-6 w-6 border-1`} /> 
      <h2 className="text-xl font-semibold text-center text-wrap">
      Loading {slug}...
      </h2>
    </div>
  );
};

export default CategoryItem;
