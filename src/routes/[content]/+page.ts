import { error } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { PageLoad } from './$types';
import { routes } from '$lib/content';

export const load: PageLoad = async ({ fetch, params }) => {
	const route = routes.find((route) => route.href.substring(1) === params.content);

	if (!route) {
		error(404, `Page "${params.content}" not found`);
	}

	if (route.contentType === 'md' && route.content) {
		const res = await fetch(resolve(route.content as `/${string}`));
		const raw = await res.text();
		return { ...route, content: raw };
	}

	return route;
};
