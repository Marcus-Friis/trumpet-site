import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { base } from '$app/paths';
import type { PageServerLoad } from './$types';
import { routes } from '$lib/content';

export const load: PageServerLoad = async ({ params }) => {
	const route = routes.find((route) => route.href.substring(1) === params.content);
	if (!route) {
		error(404, `Page "${params.content}" not found`);
	}
	if (route.contentType === 'md' && route.content) {
		const filePath = path.join(process.cwd(), 'static', route.content);
		try {
			let raw = await readFile(filePath, 'utf-8');
			// Rewrite root-relative src/href paths (e.g. /pdf/foo.pdf) to include
			// the base path, since raw HTML strings aren't handled by SvelteKit's
			// automatic base-path rewriting.
			raw = raw.replace(/((?:src|href)=["'])\/(?!\/)/g, `$1${base}/`);
			return { ...route, content: raw };
		} catch (err) {
			error(404, `Content file "${route.content}" not found`);
		}
	}
	return route;
};
