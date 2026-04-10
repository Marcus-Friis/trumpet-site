<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col items-center gap-16">
	<header class="group mt-16">
		<h1 class="text-6xl! font-bold text-primary">
			<a
				href="/"
				class="border-l-4 border-primary p-4 hover:bg-primary hover:text-primary-foreground"
			>
				Trumpet
			</a>
			<span>🎺</span>
		</h1>
	</header>

	{@render children()}
</div>
