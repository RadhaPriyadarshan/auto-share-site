import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  theme: {
      extend: {
        colors: {
          neon: {
            100: '#10A310',
            200: '#3fb53f',
          },
        }
      },
  
  },
  plugins: [
    flowbite.plugin(),
]
}