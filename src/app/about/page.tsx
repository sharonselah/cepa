'use client';

import { Clock, Construction } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="col-span-12 min-h-screen flex items-center justify-center bg-[#006633] text-white px-6 text-center">
      <div className="space-y-8 max-w-xl">
        <div className="flex flex-col items-center space-y-4">
          <Construction size={64} className="text-white" />
          <h1 className="text-4xl font-bold">Coming Soon</h1>
          <p className="text-lg">
            We’re working hard to launch something amazing. Stay tuned!
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 text-white/90">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span>Launching soon by August 2025</span>
          </div>  
         <Link href='/' className='underline'>Back to Home Page</Link>
        </div>

      </div>
    </div>
  );
}
