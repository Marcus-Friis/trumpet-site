import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html',
			precompress: false,
			strict: false
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/trumpet-site' : ''
		},
		output: {
			bundleStrategy: 'single'
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Links to static PDFs/markdown referenced from content data
				// aren't real app routes — don't fail the build over them.
				if (path.startsWith('/pdf/') || path.startsWith('/md/')) {
					console.warn(`Ignoring prerender link: ${path}`);
					return;
				}
				throw new Error(message);
			}
		}
	},
	preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
	extensions: ['.svelte', '.svx', '.md']
};
export default config;
