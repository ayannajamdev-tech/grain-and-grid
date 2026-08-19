import type { Config } from 'tailwindcss'
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { fontFamily: { display:['Playfair Display','serif'], sans:['Jost','sans-serif'] }, colors: { ink:'#302319', walnut:'#4A3323', sage:'#657456', cream:'#F7F2E8', paper:'#FFFCF7', sand:'#EAE0CF', gold:'#B7894C' }, boxShadow: { soft:'0 24px 70px rgba(48,35,25,.10)', lift:'0 20px 50px rgba(48,35,25,.16)' } } }, plugins: [] }
export default config
