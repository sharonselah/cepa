'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";


const Footer = () => {
  return (
    <>

      <div className='col-span-12 py-12 px-4 md:px-12  w-full bg-green-900 text-white'>


        <footer className={cn(" flex flex-col md:flex-row justify-between")}>

          <div className='md:w-1/3' >
            <div className='text-h3 mb-4'>AFCEN</div>
            <div className='text-white text-sm leading-8 font-medium text-justify mb-4 md:mb-6'>
              Our platform collects and organizes climate and energy data across seven key areas: Energy, Carbon Markets, Water & Waste, Agriculture, Natural Capital, Critical Minerals, and Infrastructure.
            </div>
            <button className='bg-white hover:bg-[#006633] text-black hover:text-white rounded-xl px-6 py-2 font-medium'>
              Contact Us
            </button>
          </div>

          <div>
            <div className='font-bold text-base mb-4 md:mb-6'>Menu</div>
            <ul className='flex flex-col gap-4 text-sm'>
              <Link href='/'>Home</Link>
              <Link href='https://d7x3yzflik5mk.cloudfront.net/auth/sign-in?returnTo=%2Fdashboard'>Grant</Link>
              <Link href='/TA'>Technical Assistance</Link>
              <Link href='/contributions'>Contributions</Link>
              <Link href='/projects'>Projects</Link>
            </ul>
          </div>

          <div>
            <div className='font-bold text-base mb-4 md:mb-6'>Follow Us</div>
            <ul className='flex flex-col gap-4 text-sm'>
              <Link href='/'>Twitter</Link>
              <Link href='/'>LinkedIn</Link>

            </ul>
          </div>
        </footer>

        <div className="mt-8 border-t border-white text-center py-4 text-sm">
        &copy; {new Date().getFullYear()}  All Rights Reserved
        </div>


      </div>


    </>
  );
};

export default Footer;