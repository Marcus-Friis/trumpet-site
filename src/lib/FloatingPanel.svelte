<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		icon,
		label,
		panel,
		indicator = false
	}: {
		icon: Snippet;
		label: string;
		panel: Snippet;
		indicator?: boolean;
	} = $props();

	let expanded = $state(false);
</script>

<div class="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-2">
	{#if expanded}
		<div class="w-fit border-2 border-primary bg-background p-6 shadow-lg">
			{@render panel()}
		</div>
	{/if}

	<button
		onclick={() => (expanded = !expanded)}
		class="flex h-12 w-12 items-center justify-center border-2 border-primary bg-background font-bold text-primary shadow-lg hover:bg-primary hover:text-primary-foreground {indicator
			? 'animate-pulse'
			: ''}"
		aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
		aria-expanded={expanded}
	>
		{@render icon()}
	</button>
</div>
