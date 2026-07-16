<script lang="ts">
	import { marked } from 'marked';
	import { asset } from '$app/paths';
	import type { PageProps } from './$types.ts';

	let { data }: PageProps = $props();

	const resolvedContent = $derived(data.content ? asset(data.content) : null);
	const renderedMd = $derived(data.contentType === 'md' ? marked(data.content ?? '') : null);
</script>

<div class="flex w-full flex-col items-center gap-4">
	<div class="w-full space-y-2" style="height: calc(100dvh - var(--layout-offset));">
		{#if data.contentType === 'pdf'}
			<embed src={resolvedContent} width="100%" height="100%" type="application/pdf" />
			<div class="flex justify-center">
				<a class="bottom-style mt-4" href={resolvedContent} target="_blank">Go to source</a>
			</div>
		{/if}
		{#if data.contentType === 'iframe'}
			{@html data.content}
		{/if}
		{#if data.contentType === 'md'}
			{@html renderedMd}
		{/if}
	</div>
</div>
