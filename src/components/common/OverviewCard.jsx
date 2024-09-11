import React from "react";
import { useNavigate } from "react-router-dom";

const OverviewCard = ({
  cardIcon,
  cardTitle,
  cardDescription,
  projectName,
}) => {
  const navigate = useNavigate();
  const route = cardTitle.toLowerCase();
  return (
    //todo: use the icons from the updated design later
    <div
      className=" flex flex-col justify-start
      rounded-[20px] w-[342px] h-[232px] no-underline shadow-lg p-[22px] gap-[20px] transition-transform
      transform hover:scale-105 hover:shadow-xl bg-custom-gradient cursor-pointer"
      onClick={() => navigate(`/dashboard/${projectName}/${route}`)}
    >
      <div className="flex justify-center items-center w-[76px] h-[76px] rounded-full bg-[#B2ACF4]">
        <img src={cardIcon} alt="navigation icon" />
      </div>
      <span className="text-2xl font-bold text-white">{cardTitle}</span>
      <span className="text-white">{cardDescription}</span>
    </div>
  );
};

export default OverviewCard;
