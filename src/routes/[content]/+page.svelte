<script lang="ts">
	import type { PageProps } from './$types.ts';

	let { data }: PageProps = $props();
</script>

<div class="flex w-6/10 flex-col items-center gap-4">
	<div class="w-full" style="height: calc(100dvh - var(--layout-offset));">
		{#if data.contentType === 'pdf'}
			<embed src={data.content} width="100%" height="100%" type="application/pdf" />
		{/if}
		{#if data.contentType === 'iframe'}
			{@html data.content}
		{/if}
	</div>
</div>
