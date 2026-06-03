<script lang="ts">
	import { page } from '$app/state';
	import { routes } from '$lib/content';
	import RandomButton from '$lib/RandomButton.svelte';
	import type { PageProps } from './$types.ts';

	let { data }: PageProps = $props();

	const currentIndex = $derived(routes.findIndex((r) => r.href === page.url.pathname));
	const prev = $derived(routes[currentIndex - 1] ?? null);
	const next = $derived(routes[currentIndex + 1] ?? null);
</script>

<div class="flex w-full flex-col items-center gap-4">
	{#if data.contentType === 'pdf'}
		<embed src={data.content} width="80%" height="1000px" type="application/pdf" />
	{/if}
	{#if data.contentType === 'iframe'}
		{@html data.content}
	{/if}

	<nav class="grid grid-cols-3 items-center justify-between gap-8 align-middle">
		{#if prev}
			<a
				href={prev.href}
				class="flex h-full w-fit flex-col gap-1 border-l-2 border-primary px-2 hover:bg-primary hover:text-primary-foreground"
			>
				← {prev.label}
			</a>
		{:else}
			<span></span>
		{/if}
		<RandomButton />
		{#if next}
			<a
				href={next.href}
				class="flex h-full flex-col gap-1 border-r-2 border-primary px-2 hover:bg-primary hover:text-primary-foreground"
			>
				{next.label} →
			</a>
		{/if}
	</nav>
</div>
