'use client';


import Link from 'next/link';
import { homepageSlides } from '@/data/home';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination]);

const Slider = () => {
  return (
    <div className="min-h-96 h-auto absolute top-20 w-full md:w-2/3 lg:w-[55%] text-white flex flex-col items-start">
     <Swiper
  spaceBetween={30}
  slidesPerView={1}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  loop={true}
  pagination={{
    clickable: true,
    el: '.custom-pagination',
  }}
  className="w-full relative pb-16" // Add padding-bottom to the Swiper container
>
  {homepageSlides.map((slide, index) => (
    <SwiperSlide key={index}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-left"
      >
        <h3 className="text-h2">{slide.heading}</h3>
        <p className="text-body leading-9 my-4 md:mt-6  text-justify">{slide.body}</p>
        <Link href="/contributor">
          <button className="bg-[#8e8e93] shadow-inherit text-white font-bold py-2 px-6 rounded mb-12">
            Be a Contributor
          </button>
        </Link>
      </motion.div>
    </SwiperSlide>
  ))}

  {/* Custom Pagination Container */}
  <div className="custom-pagination absolute left-0 bottom-0 text-left"></div>
</Swiper>


    </div>
  );
};

export default Slider;