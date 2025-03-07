import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cbg: "rgba(253, 237, 237, 0.2)",
        
        graytext:"#c7c7cc",
        maroon: {
          100: "#800000"
        }
      },
      spacing: {
        xs: '10px',   // 8pt ≈ 10px
        s: '16px',    // 16pt
        m: '32px',    // 24pt ≈ 32px
        l: '42px',    // 32pt ≈ 42px
        xl: '64px',   // 48pt ≈ 64px
        xxl: '106px', // 80pt ≈ 106px
      },
      gap: {
        normal: '16px', // Normal gutter
        large: '32px',  // Large gutter
      },
      fontSize: {
        h1: ['44px', { fontWeight: 'bold' }],
        h2: ['36px', { fontWeight: 'bold' }],
        h3: ['28px', { fontWeight: 'bold' }],
        h4: ['22px', { fontWeight: 'bold' }],
        body: ['18px', { fontWeight: '400' }],
        small: ['15px', { fontWeight: '400' }],
      },
      borderRadius: {
        DEFAULT: '6px', // Rounded corners for buttons
      },
      minHeight: {
        '6': '1.5rem', // 6 * 0.25rem (default Tailwind spacing scale)
      },
    },
  },
  plugins: [],
} satisfies Config;
