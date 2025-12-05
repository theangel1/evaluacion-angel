/**@type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');
const PrimeUI = require('tailwindcss-primeui');

module.exports = {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [
        addDynamicIconSelectors,
        PrimeUI
    ],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
    }
};