/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Ensure Tailwind v4 generates color utilities
			},
		},
	},
	plugins: [],
};
