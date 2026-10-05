import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { brand: colors.sky } } }, plugins: [] };
export default config;
