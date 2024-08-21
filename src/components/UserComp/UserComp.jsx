import React from "react";

const UserComp = ({Name , date , index , email}) => {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 border border-blue-300 p-3 "
    >
      <div>
        <span className="font-medium">{index + 1}</span>
      </div>
      <div>
        <span className="font-semibold">{Name}</span>
      </div>
      <div>
        <span>{email}</span>
      </div>
      <div>
        <span>
          {date.replace("GMT", "").split(" ").slice(0, 4).join(" ")}
        </span>
      </div>
    </div>
  );
};

export default UserComp;
