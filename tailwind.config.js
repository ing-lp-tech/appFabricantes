module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#7dd3fc", // celeste claro
          DEFAULT: "#0ea5e9", // azul brillante
          dark: "#0369a1", // azul oscuro
          "primary-dark": "#1e3a8a", // Ejemplo: azul oscuro
          "secondary-light": "#93c5fd", // Ejemplo: azul claro
        },
        secondary: {
          light: "#bae6fd", // celeste muy claro
          DEFAULT: "#38bdf8", // celeste
          dark: "#0284c7", // azul medio
        },
        accent: {
          light: "#a5f3fc", // turquesa claro
          DEFAULT: "#06b6d4", // turquesa
          dark: "#0e7490", // turquesa oscuro
        },
      },
    },
  },
  plugins: [],
};
