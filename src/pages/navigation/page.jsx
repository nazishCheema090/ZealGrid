import React from "react";
import { useParams } from "react-router-dom";
import DashboardListItem from "../../components/common/DashboardListItem";

const dashboardListItems = [
  { name: "Sign-in", number: "01" },
  { name: "Sign-up", number: "02" },
  { name: "Home", number: "03" },
];

const Navigation = () => {
  const { projectName } = useParams();
  return (
    <div className="flex flex-col gap-y-2 mx-20 mt-16 justify-between">
      <span className="text-3xl font-[400]">{projectName} / Navigation</span>
      <span className="text-gray-700 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus
        ex <br /> voluptates eius quasi ullam labore suscipit neque iusto quam.
      </span>
      <div className="w-full h-[1px] bg-gray-900 mt-7" />
      <span className="text-2xl font-[600] text-[#707070] mt-7">Pages</span>

      <div className="grid grid-cols-3 max-w-[1000px] items-center h-[40px]">
        <span className="text-[20px] text-gray-900 font-[400] text-left ml-[50px] ">
          Name
        </span>
        <span className="text-[20px] text-gray-900 font-[400] text-center ">
          Numbering
        </span>
        <span className="text-[20px] text-gray-900 font-[400] text-right mr-[20px] ">
          Update Pages | Delete Pages
        </span>
      </div>

      <div className="flex flex-col max-w-[1000px] gap-y-2">
        {dashboardListItems.map((item) => (
          <DashboardListItem
            key={item.number}
            name={item.name}
            number={item.number}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
