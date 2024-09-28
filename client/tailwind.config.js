/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                primary: '#6675FF',
                secondary: '#819CFF',
                light: '#F2F5FF',
                neutral: '#4D4D4D',
                'neutral-2': '#434A64',
                dark: '#191B22',
                'dark-2': '#1F2129',
                danger: '#FF2950',
                warning: '#FFB629',
                success: '#30C386',
                info: '#5ba9fc',
                'quarter-danger': '#ff6a3d',
                'semi-danger': '#ff6e88',
                'h-primary': '#6366f1',
                'h-secondary': '#818cf8',
                'h-light': '#ddd6fe',
                'h-neutral': '#57534e',
                'h-neutral-2': '#4b5563',
                'h-dark': '#030712',
                'h-danger': '#ef4444',
                'h-warning': '#fbbf24',
                'h-success': '#14b8a6',
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
