import React from "react";
import { deleteIcon, updateIcon } from "../../constants";

const DashboardListItem = ({ name, number }) => {
  return (
    <div
      className="grid grid-cols-3 items-center max-w-[1000px] h-[90px] rounded-[20px]
     bg-[#F4F4F4] hover:bg-gray-200"
    >
      {/* Name Column */}
      <span className="text-[20px] text-gray-900 font-[400] text-left ml-[50px]">
        {name}
      </span>

      {/* Numbering Column */}
      <span className="text-[20px] text-gray-900 font-[400] text-center">
        {number}
      </span>

      {/* Delete Icon Column */}
      <div className="flex justify-end items-center gap-x-2 pr-[50px]">
        <img
          src={updateIcon}
          alt="update"
          className="w-7 h-7"
          onClick={() => console.log("update")}
        />
        <div className="h-[40px] w-[3px] bg-gray-600 " />
        <img src={deleteIcon} alt="delete" className="w-7 h-8" />
      </div>
    </div>
  );
};

export default DashboardListItem;
