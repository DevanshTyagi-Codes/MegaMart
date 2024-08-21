import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Button, Input, Modal } from "../../components";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Product = () => {
  const { pid } = useParams();
  const { ID } = useParams();
  const { category } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState("");
  const [updatedProductDescription, setUpdatedProductDescription] =
    useState("");
  const [updatedProductImageRef, setUpdatedProductImageRef] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const author = product && userData ? product.userId === userData : false;

  const fetchProduct = async () => {
    auth.onAuthStateChanged(async () => {
      const docRef = doc(db, "products", ID, category, pid);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setProduct(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setUpdatedProductName(product.name);
      setUpdatedProductPrice(product.price);
      setUpdatedProductDescription(product.Description);
      setUpdatedProductImageRef(product.image);
    }
  }, [product]);

  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "products", ID, category, pid));
      toast.success("Product Deleted Successfully!");
      navigate(`/adminDashboard`);
    } catch (error) {
      toast.error("Failed to delete the product. Error: " + error.message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateProduct = async () => {
    try {
      const updatedData = {
        name: updatedProductName,
        image: updatedProductImageRef,
        price: updatedProductPrice,
        Description: updatedProductDescription,
      };
      const updateRef = doc(db, "products", ID, category, pid);
      await updateDoc(updateRef, updatedData);
      toast.success("Product Updated Successfully!");
      setIsModalOpen(false);
      fetchProduct();
      navigate("/admin/myproducts");
    } catch (error) {
      console.log(error);
      toast.error("Error in updating the post ", error);
    }
  };
  return product ? (
    <div className="flex flex-col items-center gap-5 p-6 dark:bg-slate-900 dark:text-white">
      <div className="max-w-[900px] min-h-[73vh] p-5 grid grid-cols-1 place-items-center md:grid-cols-2 gap-7">
        <div className="p-3">
          <img src={product.image} className="w-64 h-64" alt="" />
        </div>
        <div className="flex flex-col gap-1 p-3">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>{product.Description}</p>
          <span className="text-lg font-medium">&#8377;{product.price}</span>
        </div>
      </div>
      {author ? (
        <div className="flex gap-3">
          <Button
            onClick={deleteProduct}
            className={`bg-blue-500 text-white w-[35vw] sm:w-[15vw]`}
          >
            Delete
          </Button>
          <Button
            onClick={toggleModal}
            className={`bg-blue-500 text-white w-[35vw] sm:w-[15vw]`}
          >
            Update
          </Button>
        </div>
      ) : (
        ""
      )}
      <Modal isModalOpen={isModalOpen} onClose={toggleModal} className={`xl:w-[30vw] md:w-[50vw] w-[80vw]`} >
        <div className="flex min-h-[60vh] justify-center items-center">
          <form onSubmit={handleSubmit(updateProduct)} className="w-[90%]">
            <div className="w-full flex justify-center flex-col items-center gap-4">
              <Input
                label="Enter the Name"
                className={`w-[70vw] sm:w-[48vw] lg:w-[38vw] xl:w-[27vw]`}
                value={updatedProductName}
                onChange={(e) => setUpdatedProductName(e.target.value)}
              />
              <Input
                label="Enter the Price"
                className={`w-[70vw] sm:w-[48vw] lg:w-[38vw] xl:w-[27vw]`}
                value={updatedProductPrice}
                onChange={(e) => setUpdatedProductPrice(e.target.value)}
              />
              <Input
                label="Enter the Description"
                className={`w-[70vw] sm:w-[48vw] lg:w-[38vw] xl:w-[27vw]`}
                value={updatedProductDescription}
                onChange={(e) => setUpdatedProductDescription(e.target.value)}
              />
              <Input
                label="Enter the Image Link"
                className={`w-[70vw] sm:w-[48vw] lg:w-[38vw] xl:w-[27vw]`}
                value={updatedProductImageRef}
                onChange={(e) => setUpdatedProductImageRef(e.target.value)}
              />
              <Button className="bg-slate-500 text-white">
                Update Product
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  ) : (
    ""
  );
};

export default Product;
