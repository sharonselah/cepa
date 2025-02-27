import type { Metadata } from "next";
import "@styles/tailwind.css";
import "@styles/global.css";
import Footer from "@components/footer";


export const metadata: Metadata = {
  title: {
    default: "CEPA",
    template:"%s - CEPA"
  },
  description: "Data aggregation on climate and energy in Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  antialiased min-h-screen w-full grid grid-cols-12 mx-auto`}
      >
       
        {children}
        <Footer/>
       
      </body>
    </html>
  );
}
