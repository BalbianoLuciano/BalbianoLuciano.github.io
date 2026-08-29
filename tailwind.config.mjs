/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        custom: '2rem',
        customTwo: '1.5rem',
      },
      screens: {
        monitor: '1920px',
      },
      width: {
        400: '400px',
        26: '108px',
      },
      height: {
        400: '400px',
      },
      spacing: {
        25: '100px',
      },
    },
    colors: {
      // `theme.colors` esta fuera de `extend`, asi que reemplaza la paleta
      // entera de Tailwind. Sin estas dos, `bg-transparent` y `border-current`
      // no generan nada: los inputs caian al fondo blanco del browser.
      transparent: 'transparent',
      current: 'currentColor',
      '07': '#375441',
      '06': '#3A5A40',
      '05': '#557053',
      '04': '#6F8665',
      '03': '#899C78',
      '02': '#A3B18A',
      '01': '#B1BB9B',
      '00': '#BFC4AC',
      dark: '#000000',
      danger: '#CDA2AB',
      success: '#6F8665',
      white: '#F7F3EC', // off-white calido: no hay blanco puro en el sitio
    },
    fontFamily: {
      outfit: ['"Outfit"', 'sans-serif'],
    },
    fontWeight: {
      // Asume que quieres definir pesos personalizados específicos para 'outfit'
      // Nota: Solo necesitas esto si los nombres de los pesos no se alinean con los valores predeterminados de Tailwind
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
  plugins: [],
};
