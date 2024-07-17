import React from 'react';
import TT from "../assets/TT.svg";
import ZealGrid from "../assets/ZealGrid.svg";
import RadioButton from "../assets/RadioButton.svg";

const SimplePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      {/* Main container */}
      <div className="w-full h-screen relative overflow-hidden">
        {/* SVGs */}
        <div className="absolute" style={{ top: '40px', right: '30%', transform: 'rotate(-10.45deg)' }}>
          <img src={TT} alt="TT SVG" style={{ width: '162.87px', height: '112.46px' }} />
        </div>
        <div className="absolute" style={{ top: '50%', right: '25%', transform: 'translateY(-50%)' }}>
          <img src={ZealGrid} alt="Zeal Grid SVG" className="w-48" />
        </div>
        <div className="absolute" style={{ bottom: '90px', right: '32%' }}>
          <img src={RadioButton} alt="Radio Button SVG" className="w-24 transform rotate" />
        </div>
      </div>
    </div>
  );
};

export default SimplePage;
