/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				lesson: {
					1: "#427fe9",
					2: "#2ccf90",
					3: "#fcb161",
					4: "#f85e6a",
				},
			},
		},
	},
	plugins: [],
};
