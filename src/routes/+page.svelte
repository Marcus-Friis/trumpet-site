<script lang="ts">
	import { resolve } from '$app/paths';
	import { routes } from '$lib/content';
	import RandomButton from '$lib/RandomButton.svelte';

	let query = $state('');
	let filtered = $derived(
		query.trim() === ''
			? routes
			: routes.filter((route) => {
					const q = query.toLowerCase();
					return (
						route.label.toLowerCase().includes(q) ||
						route.type.toLowerCase().includes(q) ||
						route.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
						route.source?.toLowerCase().includes(q) ||
						route.contentType?.toLowerCase().includes(q)
					);
				})
	);
</script>

<div class="flex flex-col items-center gap-4">
	<input
		bind:value={query}
		type="text"
		placeholder="Find indhold"
		autofocus
		class="w-80 border-b-2 focus:border-primary focus:outline-none"
	/>
	<RandomButton entries={filtered} />
	<ul class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
		{#each filtered as route (route.href)}
			<li>
				<a
					href={resolve(route.href)}
					class="flex h-full flex-col gap-1 border-l-2 border-primary px-2 hover:bg-primary hover:text-primary-foreground"
				>
					<span class="text-xs uppercase opacity-70">{route.type}</span>
					<span class="truncate font-semibold not-italic">{route.label}</span>
				</a>
			</li>
		{:else}
			<li class="col-span-full text-center opacity-60">No matches found</li>
		{/each}
	</ul>
</div>
