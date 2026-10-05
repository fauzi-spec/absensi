import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { brand: { 50: '#eef9ff', 500: '#0b83b8', 600: '#076a9a', 700: '#075780' } } } }, plugins: [] };
export default config;
