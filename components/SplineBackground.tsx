import React from 'react';

const SplineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#e0e0e0]">
        <iframe 
            src='https://my.spline.design/websitesection-7lVuWvyyOEBfrrpSeJVDMk1c/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full object-cover scale-105" 
            title="Spline 3D Background"
        ></iframe>
    </div>
  );
};

export default SplineBackground;