/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'selector',
	content: ['./src/**/*.{html,svelte}', './node_modules/svelte-ux/**/*.{svelte,js}'],
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('svelte-ux/plugins/tailwind.cjs'),
		require('tw-bootstrap-grid-optimizer')
	],
	ux: {
		themes: {
			"light": {
				"color-scheme": "light",
				"primary": "hsl(257.4075 100% 50%)",
				"secondary": "hsl(310.4453 100% 50%)",
				"accent": "hsl(173.4835 100% 42.1865%)",
				"neutral": "hsl(214.2857 19.6262% 20.9804%)",
				"surface-100": "hsl(180 100% 100%)",
				"surface-200": "hsl(0 0% 94.902%)",
				"surface-300": "hsl(180 1.9608% 90%)"
			},
			"dark": {
				"color-scheme": "dark",
				"primary": "hsl(210 64.1026% 30.5882%)",
				"secondary": "hsl(200 12.931% 54.5098%)",
				"accent": "hsl(12.5153 79.5122% 59.8039%)",
				"neutral": "hsl(212.7273 13.5802% 15.8824%)",
				"info": "hsl(199.1549 100% 41.7647%)",
				"success": "hsl(144 30.9735% 55.6863%)",
				"warning": "hsl(39.2308 64.3564% 60.3922%)",
				"danger": "hsl(6.3415 55.6561% 43.3333%)",
				"surface-100": "hsl(0 0% 12.549%)"
			}
		}
	}
};

module.exports = config;
