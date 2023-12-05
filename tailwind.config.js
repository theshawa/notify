/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      dark: { DEFAULT: colors.slate["950"], ...colors.slate },
      light: colors.slate["50"],
      primary: { DEFAULT: colors.blue["600"], ...colors.blue },
      transparent: colors.transparent,
    },
    extend: {},
  },
  plugins: [],
};
