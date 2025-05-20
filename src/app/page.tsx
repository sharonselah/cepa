'use client';

import Slider from "./(components)/Slider";
import Cards from "./(components)/Cards";




const HomePage = () => {

  return (
    <>
      {/* Top Section */}
      <div
        className="relative bg-cover bg-center min-h-[400px] md:max-h-[80vh]"
        style={{ backgroundImage: "url('/teaser.png')" }}
      >
        {/* Softer Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d1a]/90 via-[#66bb88]/40 to-transparent z-0" />

        {/* Content */}
        <div className="relative z-10 p-8">
          <Slider />
        </div>
      </div>



      <Cards />


    </>

  );
};

export default HomePage;
