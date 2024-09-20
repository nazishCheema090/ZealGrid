import React from "react";
import { deleteIcon, updateIcon } from "../../constants";
import CustomButton from "./CustomButton";

const DashboardListItem = ({
  name,
  value = "",
  isLabels = false,
  onClick = () => {},
}) => {
  return (
    <div
      className="grid grid-cols-3 items-center max-w-[1000px] h-[90px] rounded-[20px]
     bg-[#F4F4F4] hover:bg-gray-200"
      onClick={onClick}
    >
      <span className="text-[20px] text-gray-900 font-[400] text-left ml-[50px]">
        {name}
      </span>
      {isLabels && (
        <>
          <span className="text-[20px] text-gray-900 font-[400] text-center">
            {value}
          </span>

          <div className="flex justify-end items-center pr-[50px]">
            <CustomButton
              onClick={() => console.log("update")}
              variant="text"
              width="28px"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent", // No hover background color
                  boxShadow: "none", // Remove hover shadow if needed
                },
              }}
            >
              <img src={updateIcon} alt="update" className="w-7 h-7" />
            </CustomButton>
            <div className="h-[40px] w-[3px] bg-gray-600 " />
            <CustomButton
              onClick={() => console.log("delete")}
              variant="text"
              width="28px"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent", // No hover background color
                  boxShadow: "none", // Remove hover shadow if needed
                },
              }}
            >
              <img src={deleteIcon} alt="delete" className="w-7 h-7" />
            </CustomButton>{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardListItem;
