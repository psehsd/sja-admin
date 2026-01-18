import React from 'react';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('creation-admin');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen bg-[#e0e0e0] overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe 
            src='https://my.spline.design/journeycopy-UyyFca5eIbUSAJeQ4ORjSva8/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full"
            title="Spline 3D Landing Page"
            style={{ border: 'none' }}
        />
      </div>

      {/* Invisible overlay area to match the position of the button in the Spline 3D scene */}
      <div 
          className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-80 h-32 z-50 cursor-pointer"
          onClick={scrollToContent}
          role="button"
          aria-label="Go to Creation Administration"
      />
    </section>
  );
};

export default Hero;