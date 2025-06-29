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
      comingSoon: true,
    },
    { name: "Discussion Forum", path: "https://workgroup.africacen.org/" },
    { name: "Technical Assistance", path: "/technical", comingSoon: true },
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
          src="/logo/logo-full.svg"
          alt="AfCEN Logo"
          width={100}
          height={80}
          className="object-fill"
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
            <div key={link.path} className="relative">
              <Link
                href={link.comingSoon ? "#" : link.path}
                onClick={link.comingSoon ? (e) => e.preventDefault() : undefined}
                className={cn(
                  "text-base font-medium transition-colors flex items-center gap-2",
                  link.comingSoon
                    ? "text-gray-400 cursor-not-allowed"
                    : isActive
                      ? "text-black font-semibold"
                      : "text-gray-600 hover:text-black"
                )}
              >
                {link.name}
                {link.comingSoon && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </Link>
            </div>
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
