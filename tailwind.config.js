/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "basis-full",
    "basis-1/2",
    "basis-1/3",
    "basis-2/3",
    "basis-1/4",
    "basis-2/4",
    "basis-3/4",
    "lg:w-1/3",
    "lg:w-1/2",
    "lg:w-1/4",
    "lg:float-right",
    "lg:float-left",
    "lg:flex",
    "lg:flex-wrap",
    "lg:gap-4",
    "lg:mb-6",
    "lg:flex-row-reverse",
    "lg:pl-16",
    "lg:pr-16"
  ]
}
