"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div className={cn("min-h-6 rounded-full p-2 md:px-12 bg-[#003d1a] absolute top-2 right-0 flex gap-2 md:gap-10 text-graytext", className)}>
      {[
        { name: "Home", path: "/" },
        { name: "Data", path: "/data" },
        { name: "Grant & Funding", path: "https://d7x3yzflik5mk.cloudfront.net/auth/sign-in?returnTo=%2Fdashboard" },
        { name: "Technical Assistance", path: "/technical" }
      ].map((link) => {
        const isActive =
          link.path === "/data"
            ? pathname.startsWith("/data")
            : pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`p-1 transition-colors ${isActive ? "text-white" : "text-graytext"}`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Header;
