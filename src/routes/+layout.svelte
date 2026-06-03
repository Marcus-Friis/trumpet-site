<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { routes, type Route } from '$lib/content';
	import RandomButton from '$lib/RandomButton.svelte';

	let { children } = $props();

	const currentIndex = $derived(routes.findIndex((r) => r.href === page.url.pathname));
	const prev = $derived(routes[currentIndex - 1] ?? null);
	const next = $derived(routes[currentIndex + 1] ?? null);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#snippet link(route: Route, direction: 'left' | 'right')}
	{@const border = direction === 'left' ? 'border-l-2' : 'border-r-2'}
	<a
		href={route.href}
		class="flex h-full w-fit flex-col justify-center gap-1 truncate {border} border-primary px-2 font-semibold not-italic hover:bg-primary hover:text-primary-foreground"
	>
		{#if direction === 'left'}
			← {route.label}
		{:else if direction === 'right'}
			{route.label} →
		{/if}
	</a>
{/snippet}
{#snippet contentNav()}
	{#if currentIndex !== -1}
		<nav class="col-span-2 grid w-full grid-cols-3 items-center gap-8">
			{#if prev}
				<div class="justify-self-start">{@render link(prev, 'left')}</div>
			{:else}
				<span></span>
			{/if}
			<div class="justify-self-center">
				<RandomButton />
			</div>
			{#if next}
				<div class="justify-self-end">{@render link(next, 'right')}</div>
			{:else}
				<span></span>
			{/if}
		</nav>
	{/if}
{/snippet}

<div class="flex min-h-screen flex-col items-center gap-16">
	<header class="mt-16 w-6/10">
		<div class="grid grid-cols-3 items-center">
			<h1 class="group text-6xl! font-bold text-primary">
				<a
					href="/"
					class="border-l-4 border-primary p-4 hover:bg-primary hover:text-primary-foreground"
				>
					Trumpet
				</a>
			</h1>
			{@render contentNav()}
		</div>
	</header>

	{@render children()}
</div>
