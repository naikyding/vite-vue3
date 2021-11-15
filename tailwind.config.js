module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 將沒有使用的 css 抖掉
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#E8CB89',
        priamry2: '#7BAEBE',
        primary3: '#666666',
  
        secondary: '#A6CDE0',
        secondary2: '#F8C3A1',
        secondary3: '#B4B4B4',
  
        'input-bg': '#EBEBEB'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
