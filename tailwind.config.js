module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        twitter: '#00ACEE',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        lg: '24px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
