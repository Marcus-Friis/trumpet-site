<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { routes, type Route } from '$lib/content';

	let { entries }: { entries?: Route[] } = $props();

	const pool = $derived(entries && entries.length > 0 ? entries : routes);
	let visited: string[] = $state([]);

	// Higher weight = more likely to be picked.
	// Unvisited pages are weighted much more heavily than visited ones.
	const UNVISITED_WEIGHT = 5;
	const VISITED_WEIGHT = 1;

	const getWeightedRandom = (items: Route[]): Route => {
		const weights = items.map((item) =>
			visited.includes(item.href) ? VISITED_WEIGHT : UNVISITED_WEIGHT
		);
		const total = weights.reduce((sum, w) => sum + w, 0);
		let r = Math.random() * total;

		for (let i = 0; i < items.length; i++) {
			r -= weights[i];
			if (r <= 0) return items[i];
		}
		return items[items.length - 1]; // fallback, shouldn't normally hit this
	};

	const onClick = () => {
		const random = getWeightedRandom(pool).href;
		visited.push(random);
		return goto(resolve(random));
	};
</script>

<button
	onclick={onClick}
	class="w-fit bg-primary p-2 text-primary-foreground disabled:opacity-50"
	disabled={pool.length === 0}
>
	Randomize
</button>
