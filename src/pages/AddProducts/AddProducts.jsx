import React, { useEffect, useState, useCallback } from "react";
import { Button, Input } from "../../components";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddProducts = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [categoryMap, setCategoryMap] = useState({});
  const [select, setSelect] = useState("Electronics");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageRef, setProductImageRef] = useState("");

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const clearStates = useCallback(() => {
    setProductName("");
    setProductPrice("");
    setProductImageRef("");
    setProductDescription("");
  });
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getDocs(collection(db, "products"));
      const map = {};

      productsData.forEach((doc) => {
        let keys = Object.keys(doc.data());
        keys.forEach((key) => {
          map[key] = doc.id;
        });
      });
      setCategoryMap(map);
    };
    fetchData();
  }, []);

  const addProduct = async () => {
    try {
      if (userData) {
        const documentId = categoryMap[select];
        if (!documentId) {
          throw new Error(
            "Invalid category selected or categoryMap is not properly populated."
          );
        }
        const subRef = collection(db, "products", documentId, select);
        const subRefSnapshot = await getDocs(subRef);
        subRefSnapshot.docs.map((d) => {
          console.log(d.id , d.data());
        })
        const productId = `${select.charAt(0).toUpperCase()}${
          subRefSnapshot.size + 1
        }`;
        const productData = {
          name: productName,
          price: productPrice,
          Description: productDescription,
          image: productImageRef,
          userId: userData,
          id: productId,
          category: select
        };
        await addDoc(subRef, productData);
        toast.success("Product added successfuly!");
        clearStates();
        navigate("/adminDashboard")
      } else {
        toast("Please Login First!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error adding product: ", error);
    }
  };

  return (
    <div className="w-full min-h-[80vh] p-4 flex justify-center flex-col items-center dark:bg-slate-900 dark:text-white">
      <div className=" bg-zinc-300 dark:bg-zinc-500 rounded-md p-2 flex justify-center flex-col items-center gap-2">
        <form onSubmit={handleSubmit(addProduct)} className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:gap-2 gap-1 justify-center">
            <label htmlFor="select">Select the product category</label>
            <select
              id="select"
              className="rounded  dark:text-black"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              {Object.keys(categoryMap).map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center flex-col md:items-center gap-4">
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "This is the required field",
                },
              })}
              label="Enter the Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={`w-[63vw] md:w-[45vw] lg:w-[25vw]`}
            />
            {errors.name && (
              <div className="text-xs text-red-600">{errors.name.message}</div>
            )}
            <Input
              {...register("price", {
                required: {
                  value: true,
                  message: "This is the required field",
                },
              })}
              label="Enter the Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className={`w-[63vw] md:w-[45vw] lg:w-[25vw]`}
            />
            {errors.price && (
              <div className="text-xs text-red-600">{errors.price.message}</div>
            )}
            <Input
              {...register("description", {
                required: {
                  value: true,
                  message: "This is the required field",
                },
              })}
              label="Enter the Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className={`w-[63vw] md:w-[45vw] lg:w-[25vw]`}
            />
            {errors.description && (
              <div className="text-xs text-red-600">
                {errors.description.message}
              </div>
            )}
            <Input
              {...register("image", {
                required: {
                  value: true,
                  message: "This is the required field",
                },
              })}
              label="Enter the Image Link"
              value={productImageRef}
              onChange={(e) => setProductImageRef(e.target.value)}
              className={`w-[63vw] md:w-[45vw] lg:w-[25vw]`}
            />
            {errors.image && (
              <div className="text-xs text-red-600">{errors.image.message}</div>
            )}
            <Button className="bg-zinc-500 dark:bg-zinc-600   text-white">Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
