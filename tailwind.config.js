/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#12141C',
        'night-soft': '#181B26',
        storm: '#6E5BFF',
        'storm-deep': '#4B3BD6',
        coral: '#FF7A59',
        amber: '#FFC15E',
        chalk: '#EDEDF2',
        'chalk-dim': 'rgba(237,237,242,0.62)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        bloom: 'linear-gradient(100deg, #FF7A59 0%, #FFC15E 100%)',
        'bloom-storm': 'linear-gradient(120deg, #6E5BFF 0%, #FF7A59 55%, #FFC15E 100%)',
      },
      boxShadow: {
        bloom: '0 10px 40px -12px rgba(255,122,89,0.55)',
        'bloom-lg': '0 18px 60px -10px rgba(255,122,89,0.7)',
        panel: '0 24px 70px -30px rgba(0,0,0,0.9)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 7s linear infinite',
      },
    },
  },
  plugins: [],
};
