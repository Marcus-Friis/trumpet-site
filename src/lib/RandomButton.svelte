<script lang="ts">
	import { goto } from '$app/navigation';
	import { routes, type Route } from '$lib/content';

	let { entries }: { entries?: Route[] } = $props();

	const getRandom = <T,>(arr: T[]): T => {
		return arr[Math.floor(Math.random() * arr.length)];
	};

	const pool = $derived(entries && entries.length > 0 ? entries : routes);
</script>

<button
	onclick={() => goto(getRandom(pool).href)}
	class="w-fit bg-primary p-2 text-primary-foreground disabled:opacity-50"
	disabled={pool.length === 0}
>
	Randomize
</button>
