import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: colors.indigo,
        paper: {
          50: '#FBFCFD',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0B0B0C'
        },
        accent: {
          50: '#F2FBF9',
          100: '#D6F3EC',
          200: '#AAE5D7',
          300: '#74D4BD',
          400: '#3EC3A3',
          500: '#319B82',
          600: '#267B66',
          700: '#206555',
          800: '#1A5244',
          900: '#133A31'
        },
        mustard: {
          50: '#FEF9EC',
          100: '#FCF0CF',
          200: '#F7DE90',
          300: '#F2CD57',
          400: '#EFC130',
          500: '#EDB913',
          600: '#CFA110',
          700: '#B0890E'
        },
        coral: {
          50: '#FFF1EE',
          100: '#FFE0DA',
          200: '#FFC4B8',
          300: '#F79B85',
          400: '#EC6B4B',
          500: '#E8502A',
          600: '#DE4018',
          700: '#B32F0E'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.05)',
        lift: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        glow: '0 10px 30px -10px rgb(49 155 130 / 0.4)'
      }
    }
  },
  plugins: []
};