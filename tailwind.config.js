module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",  // Ensure this matches the files where you are using Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
