import { Montserrat, Nunito_Sans, Syne } from "next/font/google";
import "@styles/tailwind.css";

export const montserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const nunitoSans = Nunito_Sans({ weight: ["400", "500"], subsets: ["latin"] });

export const SyneFont = Syne ({subsets: ["latin"]})