import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screen: {
        'xs': '512px'
      },
      colors: {
        primary: '#3b82f6',
        success: "#09dba0",
        danger: "#f34f7c",
      }
    },
  },
  plugins: [],
}
export default config
