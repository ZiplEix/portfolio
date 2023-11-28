import { sveltekit } from '@sveltejs/kit/vite';
import dynamicImport from 'vite-plugin-dynamic-import'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), dynamicImport()],
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
