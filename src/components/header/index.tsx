"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div className={cn("min-h-6 rounded-full p-2 md:px-12 bg-maroon-100 absolute top-4 right-0 flex gap-2 md:gap-10 text-graytext", className)}>
      {[
        { name: "Home", path: "/" },
        { name: "Data", path: "/data" },
        { name: "Grant & Funding", path: "/grants" },
        { name: "Technical Assistance", path: "/technical" }
      ].map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`p-1 transition-colors ${
            pathname === link.path ? "text-white" : "text-graytext"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Header;
