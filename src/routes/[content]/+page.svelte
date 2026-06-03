<script lang="ts">
	import { page } from '$app/state';
	import { routes, type Route } from '$lib/content';
	import RandomButton from '$lib/RandomButton.svelte';
	import type { PageProps } from './$types.ts';

	let { data }: PageProps = $props();

	const currentIndex = $derived(routes.findIndex((r) => r.href === page.url.pathname));
	const prev = $derived(routes[currentIndex - 1] ?? null);
	const next = $derived(routes[currentIndex + 1] ?? null);
</script>

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

<div class="flex w-6/10 flex-col items-center gap-4">
	<nav class="grid w-full grid-cols-3 items-center gap-8">
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

	<div class="w-full" style="height: calc(100dvh - var(--layout-offset));">
		{#if data.contentType === 'pdf'}
			<embed src={data.content} width="100%" height="100%" type="application/pdf" />
		{/if}
		{#if data.contentType === 'iframe'}
			{@html data.content}
		{/if}
	</div>
</div>
