<script lang="ts">
	import { marked } from 'marked';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types.ts';
	import type { ResolvedPathname } from '$app/types';

	let { data }: PageProps = $props();

	const resolvedContent: ResolvedPathname | null = $derived(
		data.content ? resolve(data.content as `/${string}`) : null
	);

	const mdPromise = $derived(
		data.contentType === 'md' && resolvedContent
			? fetch(resolvedContent)
					.then((res) => res.text())
					.then((raw) => marked(raw))
			: null
	);
</script>

<div class="flex w-full flex-col items-center gap-4">
	<div class="w-full space-y-2" style="height: calc(100dvh - var(--layout-offset));">
		{#if data.contentType === 'pdf'}
			<embed src={resolvedContent} width="100%" height="100%" type="application/pdf" />
			<div class="flex justify-center">
				<a class="bottom-style mt-4" href={resolvedContent}>Go to source</a>
			</div>
		{/if}
		{#if data.contentType === 'iframe'}
			{@html data.content}
		{/if}
		{#if data.contentType === 'md' && mdPromise}
			{#await mdPromise}
				<p>Loading...</p>
			{:then rendered}
				{@html rendered}
			{:catch}
				<p>Failed to load content.</p>
			{/await}
		{/if}
	</div>
</div>
