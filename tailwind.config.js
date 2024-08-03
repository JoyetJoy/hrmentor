/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monorope: ['"Manrope"'],
      },
      colors: {
        gray: {
          DEFAULT: "#808080",
          100:'#F5F5F5',
          200:"#7F7F7F",
          300:'#ECE9F1',
          400:'#E6E7EF',
          500:"#EBEBF0",
          
  




 
        },
        textcolor:{
          100:"#181C3A",
          200:"#646464",
          green:"#0B8A00",

        },
        btncolor: "#283277",
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "white", // name of one of the included themes for dark mode
  },
};
