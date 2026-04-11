<script lang="ts">
	import { goto } from '$app/navigation';
	import { routes } from '$lib/content';
	import { flip } from 'svelte/animate';

	let query = $state('');

	const filtered = $derived(
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
	const getRandom = <T,>(arr: T[]): T => {
		return arr[Math.floor(Math.random() * arr.length)];
	};
</script>

<div class="flex flex-col items-center gap-4">
	<input
		bind:value={query}
		type="text"
		placeholder="Find indhold"
		autofocus
		class="w-80 border-b-2 focus:border-primary focus:outline-none"
	/>

	<button
		onclick={() => goto(getRandom(filtered.length !== 0 ? filtered : routes).href)}
		class="bg-primary p-2 text-primary-foreground"
	>
		Randomize
	</button>

	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
		{#each filtered as route (route.href)}
			<a
				animate:flip
				href={route.href}
				class="border-l-2 border-primary px-2 text-primary italic hover:bg-primary hover:text-primary-foreground"
			>
				<div class="flex flex-col">
					<span>
						{#if route.contentType === 'pdf'}
							pdf
						{:else if route.contentType === 'iframe'}
							lol
						{/if}
					</span>
					<span>
						{route.label}
					</span>
					{#if route.tags}
						<span>
							{#each route.tags as tag (tag)}
								{tag}
							{/each}
						</span>
					{/if}
				</div>
			</a>
		{:else}
			No matches found
		{/each}
	</div>
</div>
