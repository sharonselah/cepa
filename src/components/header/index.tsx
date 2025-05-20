"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Data", path: "/data" },
    {
      name: "Grant & Funding",
      path: "https://d7x3yzflik5mk.cloudfront.net/auth/sign-in?returnTo=%2Fdashboard",
    },
    { name: "Technical Assistance", path: "/technical" },
  ];

  return (
    <header
      className={cn(
        "w-full bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm z-50",
        className
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/Afcen.png"
          alt="AfCEN Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Middle: Navigation */}
      <nav className="hidden md:flex gap-6">
        {navLinks.map((link) => {
          const isActive =
            link.path === "/data"
              ? pathname.startsWith("/data")
              : pathname === link.path;

          return (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-base font-medium transition-colors",
                isActive ? "text-black font-semibold" : "text-gray-600 hover:text-black"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Right: Call to Action Button */}
      <div>
        <Link
          href="/contribute"
          className="bg-[#006633] text-white text-sm px-4 py-2 rounded-full hover:bg-[#004d26] transition"
        >
          Be a Contributor
        </Link>
      </div>
    </header>
  );
};

export default Header;
