<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { routes, type Route } from '$lib/content';
	import RandomButton from '$lib/RandomButton.svelte';
	import Metronome from '$lib/Metronome.svelte';

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
		class="block min-w-0 truncate {border} border-primary px-2 py-1 font-semibold not-italic hover:bg-primary hover:text-primary-foreground"
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
		<nav class="flex w-full items-center gap-4">
			<div class="flex min-w-0 flex-1 justify-end">
				{#if prev}{@render link(prev, 'left')}{/if}
			</div>
			<div class="shrink-0">
				<RandomButton />
			</div>
			<div class="flex min-w-0 flex-1 justify-start">
				{#if next}{@render link(next, 'right')}{/if}
			</div>
		</nav>
	{/if}
{/snippet}

<div class="flex min-h-screen flex-col items-center gap-16">
	<header class="content-width mt-16">
		<div class="grid items-center lg:grid-cols-2">
			<h1 class="group mb-6 text-4xl! font-bold text-primary">
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

	<Metronome />

	<div class="content-width flex items-center justify-center gap-16">
		{@render children()}
	</div>
</div>

<style>
	.content-width {
		width: 60%;
		min-width: 600px;
	}
</style>
