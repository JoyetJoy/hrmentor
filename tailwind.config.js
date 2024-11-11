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
        monorope: ["Manrope"],
        poppins: ["Poppins"],
      },
      colors: {
       
        gray:{
          medium: "#929292",
          light: "#ECE9F1",
          smoke: "#F5F5F5",
          neutral:"#808080",
          dark: "#7F7F7F",
          pale:"#f3f4f6",
          cool:"949494",
          soft:" #EBEBF0" ,
          dim:"#696969",
          muted:"#C2C1C1",
          mediumDark:"#8b8b8b",
          platinum: "#E6E7EF",
          lightSoft:'#E6E3EB',
          lightMedium:"#848484",
          lightDim: "#646464",
          lightcool:"#F5F5F7",
          darkcool:"#CACACA",
          bright:"#667085",
          darkpale:"#525252",
          darklight:"#F7F7F7",
        },
        active: "#00B448",
        hrmdarkblue: "#181C3A",
        hrmprimaryorange: "#E95D39",
        hrmblack: "#18181B",
        hrmblue:"#030E5C",
        inactive: "#DB0000",
        darkgreen:"#23C10A26",
        paleblue:"#E0E2F3",
        darkblack:"#2C2C2C66",
        lightblack:"#2E2E2E",
       mediumgreen:" #00B4481A",
        
        grayc: {
          DEFAULT: "#808080",
          100: "#F5F5F5",
          200: "#7F7F7F",
          300: "#ECE9F1",
          400: "#E6E7EF",
          500: "#EBEBF0",
          600: "#929292",
          700: "#667085",
          800: "#808080",
          900:"#F5F5F7",
        },
        textcolor: {
          darkblue: "#181C3A",
          200: "#646464",
          300: "#3A3A3A",
          blue: " #030E5C",
          //
          green: "#0B8A00",
          red:"#C71026",
          darkCharcoal: "#2C2C2C",
          lightgreen:"#65D43E",
          gray:"#ABABAB",
          darkgreen:"#65D43E17",
          darkred:"#AB2727",

        },
        btncolor: "#283277",
        bgColor: {
          100: "#181C3A",
          200: "#FFFFFF",
          300: "#E0E2F3",
          400: "5264EA",
        },
      },
      backgroundImage: {
        subcription: "url('/public/assets/images/bg-subcription.png')",
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "white",
    base: false,
  },
};
