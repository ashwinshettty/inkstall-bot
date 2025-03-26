export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        secondary: {
          light: '#f3f4f6',
          DEFAULT: '#e5e7eb',
          dark: '#d1d5db',
        },
        aiMessage: '#f3f4f6',
        userMessage: '#ede9fe',
        // New colors for login page
        inkstall: {
          blue: '#3b5aed',
          darkBlue: '#0a1172',
          yellow: '#ffd24c',
          cream: '#FFF2C6',
        }
      },
    },
  },
  plugins: [],
}
