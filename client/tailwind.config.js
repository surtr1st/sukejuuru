/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        extend: {
            colors: {
                primary: '#6675FF',
                secondary: '#819CFF',
                light: '#F2F5FF',
                neutral: '#4D4D4D',
                'neutral-2': '#434A64',
                dark: '#191B22',
                danger: '#FF2950',
                warning: '#FFB629',
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
