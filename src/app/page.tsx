'use client';

import Slider from "./(components)/Slider";
import Header from "@components/header";
import Cards from "./(components)/Cards";
import Footer from "@components/footer";



const HomePage = () => {

  return (
    <>
      {/* Top Section */}
      <div className="col-span-12 relative bg-cover bg-center min-h-[400px] md:max-h-[80vh]" style={{ backgroundImage: "url('/teaser.png')" }}>

        <div className="absolute inset-0 bg-gradient-to-r from-[#800000]/90 to-[#1A0000]/50" />

        <div className='mx-8 h-full relative'>
          <Header />
          <Slider />
        </div>
        <Cards />

        <Footer />
      </div>


    </>

  );
};

export default HomePage;
