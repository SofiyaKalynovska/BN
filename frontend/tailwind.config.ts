import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../shared/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      display: ['group-hover'],
      visibility: ['group-hover'],
      colors: {
        pink800: '#C239B3',
        blue100: '#EDF2FD',
        blue500: '#43A1E5',
        orange600: '#FF400F',
        neutral900: '#252629',
        gray500: '#8D939A',
        slate500: '#B4BDD3',
        purple800: '#792CEC',
        amber50: '#43A1E5',
        lime600: '#10AD20',
        stone200: '#E4E8F0',
      },
      cursor: {
        pointer: 'pointer',
      },
      width: {
        '360': '360px',
        '450': '450px',
      },
    },
  },
  plugins: [],
};

export default config;
