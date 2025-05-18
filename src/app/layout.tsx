import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@styles/tailwind.css";
import "@styles/global.css";

const nunitoSans = Nunito_Sans({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'), 
  title: {
    default: "AFCEN",
    template:"%s - AFCEN"
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
        className={`${nunitoSans.className} antialiased min-h-screen w-full grid grid-cols-12 mx-auto`}
      >
       
        {children}
      
       
      </body>
    </html>
  );
}
