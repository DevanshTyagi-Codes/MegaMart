import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProductComp } from "../../components";

const AllProducts = () => {
  const [showProducts, setShowProducts] = useState([]);
  const fetchProductsList = async () => {
    const products = collection(db, "products");
    const productsSnapshot = await getDocs(products);
    let subCollection = [];
    const productsPromises = productsSnapshot.docs.map(async (doc) => {
      let keys = Object.keys(doc.data());
      const productsSubCollection = await getDocs(
        collection(db, "products", doc.id, keys[0])
      );
      productsSubCollection.docs.map((subDoc) => {
        subCollection.push({iD: subDoc.id, cid: doc.id , ...subDoc.data()});
      });
      return subCollection;
    });
    const productsList = await Promise.all(productsPromises);
    setShowProducts(productsList);
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  return (
    <div className="flex flex-col min-h-[73vh] gap-2 px-3 py-1 overflow-auto dark:bg-slate-900 dark:text-white">
      <h2 className="text-center font-semibold text-xl my-2 text-cyan-500">Products List</h2>
      {showProducts ? (
        showProducts[0]?.map((product, index) => (
          <ProductComp
            key={index}
            index={index}
            name={product.name}
            price={product.price}
            image={product.image}
            Description={product.Description}
            uid={product.iD}
            cid={product.cid}
            category={product.category}
          />
        ))
      ) : (
        <div className="mt-4">
          <h2 className="text-center font-bold text-xl">
            Currently no products are available:{" "}
          </h2>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
