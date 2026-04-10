<script lang="ts">
	import type { PageProps } from './$types.ts';

	let { data }: PageProps = $props();
</script>

{#if data.contentType === 'pdf'}
	<embed src={data.content} width="80%" height="1000px" type="application/pdf" />
{/if}

{#if data.contentType === 'iframe'}
	{@html data.content}
{/if}
