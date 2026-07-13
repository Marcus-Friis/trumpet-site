<script lang="ts">
	import FloatingPanel from './FloatingPanel.svelte';

	let bpm = $state(120);
	let isPlaying = $state(false);
	let beatsPerMeasure = $state(4);
	let currentBeat = $state(0);

	let audioCtx: AudioContext | null = null;
	let nextNoteTime = 0;
	let schedulerId: number | null = null;
	let beatCounter = 0;

	const LOOKAHEAD = 25;
	const SCHEDULE_AHEAD_TIME = 0.1;

	const playClick = (time: number, accent: boolean) => {
		if (!audioCtx) return;
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();
		osc.connect(gain);
		gain.connect(audioCtx.destination);
		osc.frequency.value = accent ? 1000 : 800;
		gain.gain.setValueAtTime(1, time);
		gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
		osc.start(time);
		osc.stop(time + 0.05);
	};

	const scheduler = () => {
		if (!audioCtx) return;
		while (nextNoteTime < audioCtx.currentTime + SCHEDULE_AHEAD_TIME) {
			const accent = beatCounter % beatsPerMeasure === 0;
			playClick(nextNoteTime, accent);
			const beatToShow = beatCounter % beatsPerMeasure;
			const delay = (nextNoteTime - audioCtx.currentTime) * 1000;
			setTimeout(() => (currentBeat = beatToShow), Math.max(0, delay));
			nextNoteTime += 60 / bpm;
			beatCounter++;
		}
		schedulerId = window.setTimeout(scheduler, LOOKAHEAD);
	};

	const start = () => {
		if (isPlaying) return;
		audioCtx = new AudioContext();
		beatCounter = 0;
		nextNoteTime = audioCtx.currentTime + 0.05;
		isPlaying = true;
		scheduler();
	};

	const stop = () => {
		isPlaying = false;
		currentBeat = 0;
		if (schedulerId !== null) {
			clearTimeout(schedulerId);
			schedulerId = null;
		}
		audioCtx?.close();
		audioCtx = null;
	};

	const toggle = () => (isPlaying ? stop() : start());

	$effect(() => {
		return () => stop();
	});
</script>

{#snippet icon()}
	♩
{/snippet}

{#snippet panel()}
	<div class="flex w-fit flex-col items-center gap-4">
		<div class="flex items-center gap-4">
			<button
				onclick={() => (bpm = Math.max(30, bpm - 1))}
				class="border-2 border-primary px-3 py-1 font-bold hover:bg-primary hover:text-primary-foreground"
				aria-label="Decrease tempo"
			>
				−
			</button>
			<div class="w-20 text-center">
				<div class="text-3xl font-bold text-primary">{bpm}</div>
				<div class="text-xs">BPM</div>
			</div>
			<button
				onclick={() => (bpm = Math.min(300, bpm + 1))}
				class="border-2 border-primary px-3 py-1 font-bold hover:bg-primary hover:text-primary-foreground"
				aria-label="Increase tempo"
			>
				+
			</button>
		</div>

		<input type="range" min="30" max="300" bind:value={bpm} class="w-48 accent-primary" />

		<div class="flex gap-2">
			{#each Array(beatsPerMeasure) as _, i (i)}
				<div
					class="h-3 w-3 rounded-full border-2 border-primary {currentBeat === i && isPlaying
						? 'bg-primary'
						: 'bg-transparent'}"
				></div>
			{/each}
		</div>

		<label class="flex items-center gap-2 text-sm">
			Beats/measure
			<select
				bind:value={beatsPerMeasure}
				class="border-2 border-primary bg-transparent px-1 py-0.5"
			>
				{#each [2, 3, 4, 5, 6] as n (n)}
					<option value={n}>{n}</option>
				{/each}
			</select>
		</label>

		<button
			onclick={toggle}
			class="w-32 bg-primary p-2 font-semibold text-primary-foreground hover:opacity-90"
		>
			{isPlaying ? 'Stop' : 'Start'}
		</button>
	</div>
{/snippet}

<FloatingPanel {icon} {panel} label="metronome" indicator={isPlaying} />
