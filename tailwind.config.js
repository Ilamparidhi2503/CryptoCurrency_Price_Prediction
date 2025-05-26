import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",   // 12px
          small: "0.875rem", // 14px
          medium: "0.9375rem", // 15px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "6px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: "#f8f9fa"
            },
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#11181C"
            },
            content2: {
              DEFAULT: "#f4f4f5",
              foreground: "#27272a"
            },
            content3: {
              DEFAULT: "#e4e4e7",
              foreground: "#3f3f46"
            },
            content4: {
              DEFAULT: "#d4d4d8",
              foreground: "#52525b"
            },
            primary: {
              50: "#e6f7ff",
              100: "#bae3ff",
              200: "#7cc4fa",
              300: "#47a3f3",
              400: "#2186eb",
              500: "#0967d2",
              600: "#0552b5",
              700: "#03449e",
              800: "#01337d",
              900: "#002159",
              DEFAULT: "#0967d2",
              foreground: "#ffffff"
            }
          }
        },
        dark: {
          colors: {
            background: {
              DEFAULT: "#0f172a"
            },
            content1: {
              DEFAULT: "#1e293b",
              foreground: "#f8fafc"
            },
            content2: {
              DEFAULT: "#334155",
              foreground: "#f1f5f9"
            },
            content3: {
              DEFAULT: "#475569",
              foreground: "#f1f5f9"
            },
            content4: {
              DEFAULT: "#64748b",
              foreground: "#f1f5f9"
            },
            primary: {
              50: "#002159",
              100: "#01337d",
              200: "#03449e",
              300: "#0552b5",
              400: "#0967d2",
              500: "#2186eb",
              600: "#47a3f3",
              700: "#7cc4fa",
              800: "#bae3ff",
              900: "#e6f7ff",
              DEFAULT: "#2186eb",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
}
