/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                primary: '#6675FF',
                secondary: '#819CFF',
                frost: '#F2F5FF',
                neutral: '#4D4D4D',
                slate: '#434A64',
                midnight: '#191B22',
                shadow: '#1F2129',
                rose: '#FF2950',
                amber: '#FFB629',
                mint: '#30C386',
                skyblue: '#5ba9fc',
                sunset: '#ff6a3d',
                blush: '#ff6e88',
            },
            fontFamily: {
                sans: ['Hanken Grotesk', 'sans-serif'],
                serif: ['Hanken Grotesk', 'serif'],
            },
            borderRadius: {
                '7px': '0.438rem',
            },
        },
    },
    plugins: [],
};
