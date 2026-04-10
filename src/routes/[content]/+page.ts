import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { routes } from '$lib/content';

export const load: PageLoad = ({ params }) => {
	const route = routes.find((route) => route.href.substring(1) === params.content);

	if (!route) {
		error(404, `Page "${params.content}" not found`);
	}

	return route;
};
