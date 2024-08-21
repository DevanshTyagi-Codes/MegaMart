import React from "react";
import { Link} from "react-router-dom";

const Item = ({name , id}) => {
  return (
    <Link to={`/category/${name}/${id}`}>
      <div className="border border-blue-500 dark:border-blue-100 flex justify-center items-center p-2 cursor-pointer h-16">
        <span className="text-lg font-medium text-blue-700 dark:text-blue-200">{name}</span>
      </div>
    </Link>
  );
};

export default Item;
