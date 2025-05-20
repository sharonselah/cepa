'use client';

import Slider from "./(components)/Slider";
import Cards from "./(components)/Cards";
import Image from "next/image";


const HomePage = () => {

  return (
    <>
      {/* Top Section */}
     <div className="relative min-h-[400px] md:max-h-[80vh] overflow-hidden">
  {/* Background Image */}
  <Image
    src="/teaser.png"
    alt="Background"
    fill
    priority
    className="object-cover object-center"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#003d1a]/90 via-[#66bb88]/40 to-transparent z-10" />

  {/* Content */}
  <div className="relative z-20 p-8">
    <Slider />
  </div>
</div>



      <Cards />


    </>

  );
};

export default HomePage;
