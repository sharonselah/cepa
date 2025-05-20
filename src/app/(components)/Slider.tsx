'use client';

import React from 'react';
import Link from 'next/link';
import { homepageSlides } from '@/data/home';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // ✅ NO SwiperCore
import 'swiper/css';
import 'swiper/css/pagination';


const Slider = () => {
  return (
    <>
    <div className="min-h-72 max-h-72 h-auto w-full md:w-2/3 lg:w-[55%] text-white flex flex-col items-start">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        className="w-full relative pb-16"
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
              <h3 className="text-h3">{slide.heading}</h3>
              <p className="text-base leading-9 my-4 md:mt-6 text-justify">{slide.body}</p>
              <Link href="/contributor">
                <button className="bg-white shadow-inherit text-black font-bold py-2 px-6 rounded mb-12">
                  Be a Contributor
                </button>
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
       {/*  <div className="custom-pagination absolute left-0 bottom-0 text-left"></div>*/}
      </Swiper>
    </div>

    
    </>
  );
};

export default Slider;
