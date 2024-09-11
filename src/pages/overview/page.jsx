import React from "react";
import { useParams } from "react-router-dom";
import OverviewCard from "../../components/common/OverviewCard";
import { cardItems } from "../../constants";

const Overview = () => {
  const { projectName } = useParams();

  return (
    <div className="flex flex-col w-full mx-20 mb-10 ">
      <span className="text-4xl mt-10 font-[300]">{projectName}</span>
      <span className="mt-5 mb-10 ">
        Design a promising website to scale your business better and
        <br /> bigger. Zeal grid is providing all you need.
      </span>
      <div className="flex flex-wrap gap-4 w-full mr-10">
        {cardItems.map((item) => (
          <OverviewCard
            key={item.title}
            cardIcon={item.icon}
            cardTitle={item.title}
            cardDescription={item.description}
            projectName={projectName}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
