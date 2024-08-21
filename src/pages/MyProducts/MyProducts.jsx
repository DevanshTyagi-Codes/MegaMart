import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductComp } from "../../components";
import toast from "react-hot-toast";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const MyProducts = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [showMyProducts, setShowMyProducts] = useState([]);

  const fetchUserProductsData = async () => {
    try {
      const productsData = collection(db, "products");
      const prodoctSnapshot = await getDocs(productsData);
      let subCollection = [];
      const myProductsPromises = prodoctSnapshot.docs.map(async (doc) => {
        let keys = Object.keys(doc.data());
        const myProductsSubCollection = collection(
          db,
          "products",
          doc.id,
          keys[0]
        );
        const q = query(
          myProductsSubCollection,
          where("userId", "==", userData)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.map((subDoc) => {
          subCollection.push({ iD: subDoc.id, cid: doc.id , ...subDoc.data()});
        });
        return subCollection;
      });
      const myProductsList = await Promise.all(myProductsPromises);
      setShowMyProducts(myProductsList);
    } catch (error) {
      toast.error("Error in fetching the data!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProductsData();
  }, []);

  return (
    <div className="min-h-[73vh] flex flex-col gap-2 px-3 py-1 overflow-auto dark:bg-slate-900 dark:text-white">
      <h2 className="text-center font-semibold text-xl my-2 text-cyan-500">
        My Products List
      </h2>
      {showMyProducts[0]?.length > 0 ? (
        showMyProducts[0]?.map((product, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <ProductComp
              index={index}
              name={product.name}
              price={product.price}
              image={product.image}
              Description={product.Description}
              uid={product.iD}
              category={product.category}
              cid={product.cid}
            />
          </div>
        ))
      ) : (
        <div className="mt-4">
          <h2 className="text-center font-bold text-xl">
            You have added 0 products till now.
          </h2>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
