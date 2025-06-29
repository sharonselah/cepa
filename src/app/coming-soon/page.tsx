"use client";

import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 7,
    minutes: 23,
    seconds: 27
  });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = { ...prevTime };
        
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else if (newTime.minutes > 0) {
          newTime.seconds = 59;
          newTime.minutes--;
        } else if (newTime.hours > 0) {
          newTime.seconds = 59;
          newTime.minutes = 59;
          newTime.hours--;
        } else if (newTime.days > 0) {
          newTime.seconds = 59;
          newTime.minutes = 59;
          newTime.hours = 23;
          newTime.days--;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-600 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          We&apos;re launching<br />
          <span className="relative">
            soon
            <span className="inline-block w-4 h-4 bg-orange-400 rounded-full ml-2 animate-pulse"></span>
            <span className="inline-block w-3 h-3 bg-orange-300 rounded-full ml-1 animate-pulse delay-75"></span>
          </span>
          !
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          We have something amazing that is going to blow you away.<br />
          Subscribe to be the first to know all about ACEN.
        </p>

        {/* Email subscription form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 mb-12 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email address"
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 bg-opacity-70 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-orange-400 hover:bg-orange-500 text-black font-semibold rounded-lg transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>

        {/* Countdown timer */}
        <div className="bg-gray-900 bg-opacity-70 rounded-lg p-6 backdrop-blur-sm">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-300">Days</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-300">Hours</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-300">Minutes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-300">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
