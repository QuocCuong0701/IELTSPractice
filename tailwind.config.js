/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: '#FFB5C2',
          'pink-dark': '#FF8FA3',
          lavender: '#C3AED6',
          'lavender-dark': '#A88DC4',
          mint: '#B5EAD7',
          'mint-dark': '#8EDBBF',
          peach: '#FFDAC1',
          'peach-dark': '#FFC4A0',
          yellow: '#FFF5BA',
          'yellow-dark': '#FFEDA3',
          blue: '#B3D9FF',
          'blue-dark': '#8BB8E6',
          coral: '#FFB3B3',
          'coral-dark': '#E68B8B',
          teal: '#B3E6D9',
          'teal-dark': '#8BCDB8',
          rose: '#FFB3D9',
          'rose-dark': '#E68BB3',
          amber: '#FFD9B3',
          'amber-dark': '#E6B88B',
          bg: '#FFF8F5',
          'bg-dark': '#1a1625',
          'card-bg': '#FFFFFF',
          'card-bg-dark': '#2a2540',
          text: '#4A4063',
          'text-light': '#8B7FAE',
          'text-dark': '#E8E0F0',
          'text-light-dark': '#9B8FB5',
        },
      },
      fontFamily: {
        kawaii: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        kawaii: '20px',
        'kawaii-sm': '16px',
        'kawaii-full': '999px',
      },
      boxShadow: {
        kawaii: '0 4px 16px rgba(195, 174, 214, 0.25)',
        'kawaii-lg': '0 8px 32px rgba(195, 174, 214, 0.3)',
        'kawaii-sm': '0 2px 8px rgba(195, 174, 214, 0.2)',
        'kawaii-card-dark': '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
