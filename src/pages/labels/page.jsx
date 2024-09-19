import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardListItem from "../../components/common/DashboardListItem";
import AddIcon from "@mui/icons-material/Add";
import { labelsListItems } from "../../constants";

const Labels = () => {
  const { projectName } = useParams();
  const [label, setLabel] = useState({});
  return (
    <div className="flex flex-col gap-y-2 mx-20 mt-16 justify-between">
      <span className="text-3xl font-[400]">{projectName} / Navigation</span>

      <span className="text-gray-700 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus
        ex <br /> voluptates eius quasi ullam labore suscipit neque iusto quam.
      </span>
      <div className="w-full h-[1px] bg-gray-900 mt-7" />
      <span className="text-4xl font-[300] text-[#707070] mt-7">
        {label?.labelItems ? `Page / ${label.name}` : "Pages"}
      </span>
      {label?.labelItems && (
        <div className="grid grid-cols-3 max-w-[1000px] items-center h-[40px] mt-4">
          <span className="text-[20px] text-gray-900 font-[400] text-left ml-[50px] ">
            Key
          </span>
          <span className="text-[20px] text-gray-900 font-[400] text-center ">
            Value
          </span>
          <span className="text-[20px] text-gray-900 font-[400] text-right mr-[20px] ">
            Update Labels | Delete Labels
          </span>
        </div>
      )}
      <div className="flex flex-col max-w-[1000px] gap-y-2">
        {!label?.labelItems &&
          labelsListItems.map((item) => (
            <DashboardListItem
              key={item.label.name}
              name={item.label.name}
              isLabels={false}
              onClick={() => setLabel(item.label)}
            />
          ))}
        {label?.labelItems &&
          label.labelItems.map((item) => (
            <DashboardListItem
              key={item.itemName}
              name={item.itemName}
              value={item.itemValue}
              isLabels={true}
            />
          ))}
      </div>
      {label?.labelItems && (
        <div className="flex mt-7">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 ">
            <AddIcon
              style={{
                height: "30px",
                width: "30px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Labels;
