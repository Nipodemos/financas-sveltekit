import flowbitePlugin from 'flowbite/plugin'
/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [
		flowbitePlugin,
		require('tw-bootstrap-grid-optimizer')
	],
};

module.exports = config;
