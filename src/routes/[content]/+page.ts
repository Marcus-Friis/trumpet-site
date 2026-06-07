import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { routes } from '$lib/content';

export const load: PageLoad = async ({ fetch, params }) => {
	const route = routes.find((route) => route.href.substring(1) === params.content);

	console.log(route, routes);
	if (!route) {
		error(404, `Page "${params.content}" not found`);
	}

	if (route.contentType === 'md' && route.content) {
		const res = await fetch(route.content);
		const raw = await res.text();
		return { ...route, content: raw };
	}

	return route;
};
