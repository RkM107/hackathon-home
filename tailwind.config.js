/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // brightRed: "hsl(12, 88%, 59%)",
        brightRed: "#E60000",
        // brightRedLight: "hsl(12, 88%, 69%)",
        brightRedLight: "#fa6161",
        brightRedSupLight: "#FF999F",
        grayish: "#646464",
        offWhite: "#F4F3EE",
        highlightRed: "#E60000",
        veryLightGray: "#fafafa",
        veryDarkBlue: "#1d1e25",
        //brightRedSupLight: "hsl(12, 88%, 95%)",
        darkBlue: "hsl(228, 39%, 23%)",
        // darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
      },
    },
  },

  plugins: [],
};
