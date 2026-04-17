/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:              '#005577',
        'primary-light':      '#8dd1f5',
        'on-primary':         '#ffffff',
        'on-surface':         '#002233',
        'on-surface-variant': '#446677',
        'surface-low':        '#f0f9ff',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:     ['Manrope', 'sans-serif'],
        label:    ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
