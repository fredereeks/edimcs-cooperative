import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tw-elements/dist/js/**/*.js",
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
        default: "#323f89"
      }
    },
  },
  plugins: [require("daisyui"), require("tw-elements/dist/plugin.cjs")],
  daisyui: {
    themes: ["light", "dark", "winter"],
  },
}
export default config
