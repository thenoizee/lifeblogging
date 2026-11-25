/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./www/**/*.{html,js}"
  ],
  darkMode: 'class',
  safelist: [
    // Dynamic classes used in Analyser correlations (hue = 'emerald' | 'rose')
    'bg-emerald-50', 'dark:bg-emerald-900/20', 'border-emerald-200', 'dark:border-emerald-800',
    'text-emerald-900', 'dark:text-emerald-100', 'text-emerald-500', 'text-emerald-600', 'dark:text-emerald-400',
    'text-emerald-700', 'dark:text-emerald-300', 'dark:bg-emerald-950',
    'bg-rose-50', 'dark:bg-rose-900/20', 'border-rose-200', 'dark:border-rose-800',
    'text-rose-900', 'dark:text-rose-100', 'text-rose-500', 'text-rose-600', 'dark:text-rose-400',
    'text-rose-700', 'dark:text-rose-300', 'dark:bg-rose-950',
    // Dynamic classes used in HydrationTrackr custom cups & SharedNav notifications/mobile tabs
    {
      pattern: /^(bg|text|border)-(slate|lime|orange|teal|blue|red|amber|pink|purple|green|indigo|cyan|zinc|emerald|fuchsia|rose|sky|yellow|gray)-(50|100|200|400|500|600|700|800)$/,
      variants: ['hover', 'dark'],
    },
    {
      pattern: /^bg-(slate|lime|orange|teal|blue|red|amber|pink|purple|green|indigo|cyan|zinc|emerald|fuchsia|rose|sky|yellow|gray)-900\/(20|30|40|50)$/,
      variants: ['dark'],
    },
    {
      pattern: /^border-(slate|lime|orange|teal|blue|red|amber|pink|purple|green|indigo|cyan|zinc|emerald|fuchsia|rose|sky|yellow|gray)-900\/50$/,
      variants: ['dark'],
    },
    {
      pattern: /^from-(slate|lime|orange|teal|blue|red|amber|pink|purple|green|indigo|cyan|zinc|emerald|fuchsia|rose|sky|yellow)-50\/70$/,
    },
    {
      pattern: /^from-(slate|lime|orange|teal|blue|red|amber|pink|purple|green|indigo|cyan|zinc|emerald|fuchsia|rose|sky|yellow)-900\/20$/,
      variants: ['dark'],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary, #6366f1)',
          hover: 'var(--primary-hover, #4f46e5)',
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        'primary-hover': 'var(--primary-hover, #4f46e5)',
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
