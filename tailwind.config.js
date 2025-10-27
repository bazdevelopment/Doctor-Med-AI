const colors = require('./src/components/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        'primary-work-sans': 'Font-Regular', // For `font-medium`
        'semibold-work-sans': 'Font-SemiBold', // For `font-semibold`
        'bold-work-sans': 'Font-Bold', // For `font-bold`
        'light-work-sans': 'Font-Light', // For "font-light"
        'medium-work-sans': 'Font-Medium', // For "medium-work-sans"
        'extra-bold-work-sans': 'Font-Extra-Bold',
      },
      colors,
    },
  },
  plugins: [],
};
