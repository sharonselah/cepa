'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { homepageSlides } from '@/data/home';
import { cn } from '@/lib/utils';
import {motion} from 'framer-motion'

const Slider = () => {
    const [activeSlide, setActiveSlide] = useState(0);
  
    return (
      <div className='min-h-96 absolute top-20 w-full md:w-2/3 lg:w-1/2 text-white flex flex-col items-start'>
        {homepageSlides.map((slide, index) => (
          <div key={index} className={cn('transition-opacity text-left duration-500', activeSlide === index ? 'opacity-100' : 'opacity-0 hidden')}>
            <h3 className="text-h2">{slide.heading}</h3>
            <p className="text-body leading-8 my-4 md:mt-6 md:mb-8 text-justify">{slide.body}</p>
            <Link href="/contributor">
              <button className="bg-[#8e8e93] shadow-inherit text-white font-bold py-2 px-6 rounded">Be a Contributor</button>
            </Link>
          </div>

          
        ))}
  
        <div className="flex gap-2 mt-4">
          {homepageSlides.map((_, index) => (
            <button
              key={index}
              className={cn('w-3 h-3 rounded-full border', activeSlide === index ? 'bg-yellow-500' : 'bg-white')}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Slider;