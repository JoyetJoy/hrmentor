/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monorope: ['"Manrope"'],
      },
      colors: {
        gray: {
          DEFAULT: "#808080",
          100: "#F5F5F5",
          200: "#7F7F7F",
          300: "#ECE9F1",
          400: "#E6E7EF",
          500: "#EBEBF0",
          600: "#929292",
          700: "#667085",
          800: "#808080",
        },
        textcolor: {
          100: "#181C3A",
          200: "#646464",
          green: "#0B8A00",
          300: "#3A3A3A",
          blue: " #030E5C",
        },
        btncolor: "#283277",
        bgColor: {
          100: "#181C3A",
          200: "#FFFFFF",
        },
      },
      backgroundImage: {
        subcription: "url('/public/assets/images/bg-subcription.png')",
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "white", // name of one of the included themes for dark mode
    base: false,
  },
};
