import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {},
	},
	server: {
		watch: {
			usePolling: true,
		},
	}
};

export default config;
