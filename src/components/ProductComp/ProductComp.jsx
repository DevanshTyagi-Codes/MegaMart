import React from "react";
import {Link} from 'react-router-dom'

const ProductComp = ({ uid , index, image, name, price, Description , category , cid }) => {
  return (
    <Link to={`/product/${cid}/${category}/${uid}`}>
      <div className="grid grid-cols-1 md:grid-cols-[0.2fr_1fr_1fr_1fr_2.8fr] place-items-center border border-blue-300 p-3 gap-2">
        <div>
          <span className="font-medium">{index + 1}</span>
        </div>
        <div>
          <img className="h-32 w-32" src={image} alt="" />
        </div>
        <div>
          <span className="font-semibold">{name}</span>
        </div>
        <div>
          <span className="font-semibold">&#8377;{price}</span>
        </div>
        <div className="text-center">
          <span>{Description}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductComp;
