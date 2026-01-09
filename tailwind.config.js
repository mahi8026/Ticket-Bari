/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Professional Brand Colors - Modern Blue & Teal Gradient
        primary: {
          DEFAULT: "#0066FF", // Vibrant Blue
          50: "#E6F2FF",
          100: "#CCE5FF",
          200: "#99CCFF",
          300: "#66B2FF",
          400: "#3399FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          800: "#002966",
          900: "#001433",
        },
        secondary: {
          DEFAULT: "#00D4AA", // Modern Teal
          50: "#E6FDF9",
          100: "#CCFBF3",
          200: "#99F7E7",
          300: "#66F3DB",
          400: "#33EFCF",
          500: "#00D4AA",
          600: "#00AA88",
          700: "#008066",
          800: "#005544",
          900: "#002B22",
        },
        accent: {
          DEFAULT: "#FF6B35", // Energetic Orange
          50: "#FFF4F0",
          100: "#FFE9E0",
          200: "#FFD3C2",
          300: "#FFBDA3",
          400: "#FFA785",
          500: "#FF6B35",
          600: "#E5522A",
          700: "#CC391F",
          800: "#B22014",
          900: "#990709",
        },
        success: {
          DEFAULT: "#00C851", // Fresh Green
          50: "#E6FFF2",
          100: "#CCFFE6",
          200: "#99FFCC",
          300: "#66FFB3",
          400: "#33FF99",
          500: "#00C851",
          600: "#00A041",
          700: "#007831",
          800: "#005021",
          900: "#002811",
        },
        warning: {
          DEFAULT: "#FFB400", // Golden Yellow
          50: "#FFFBE6",
          100: "#FFF7CC",
          200: "#FFEF99",
          300: "#FFE766",
          400: "#FFDF33",
          500: "#FFB400",
          600: "#CC9000",
          700: "#996C00",
          800: "#664800",
          900: "#332400",
        },
        error: {
          DEFAULT: "#FF4757", // Modern Red
          50: "#FFF0F2",
          100: "#FFE0E6",
          200: "#FFC2CC",
          300: "#FFA3B3",
          400: "#FF8599",
          500: "#FF4757",
          600: "#E5394C",
          700: "#CC2B41",
          800: "#B21D36",
          900: "#990F2B",
        },
        // Neutral Colors for Better Contrast
        neutral: {
          DEFAULT: "#64748B", // Slate Gray
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // Background Colors
        background: {
          light: "#FAFBFC",
          dark: "#0A0E1A",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1A1F2E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        strong:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 20px rgba(0, 102, 255, 0.15)",
        "glow-secondary": "0 0 20px rgba(0, 212, 170, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        "pulse-soft": "pulseSoft 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0066FF",
          secondary: "#00D4AA",
          accent: "#FF6B35",
          neutral: "#64748B",
          "base-100": "#FAFBFC",
          "base-200": "#F1F5F9",
          "base-300": "#E2E8F0",
          info: "#0066FF",
          success: "#00C851",
          warning: "#FFB400",
          error: "#FF4757",
        },
        dark: {
          primary: "#3399FF",
          secondary: "#33EFCF",
          accent: "#FFA785",
          neutral: "#94A3B8",
          "base-100": "#0A0E1A",
          "base-200": "#1A1F2E",
          "base-300": "#2A2F3E",
          info: "#3399FF",
          success: "#33FF99",
          warning: "#FFE766",
          error: "#FF8599",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
};
