import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
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
			const raw = await readFile(filePath, 'utf-8');
			return { ...route, content: raw };
		} catch (err) {
			error(404, `Content file "${route.content}" not found`);
		}
	}
	return route;
};
