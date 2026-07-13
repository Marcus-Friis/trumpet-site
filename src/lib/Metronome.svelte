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

	const HOLD_DELAY = 400; // ms before repeat starts
	const HOLD_INTERVAL = 80; // ms between repeats

	// Svelte action: calls `callback` once immediately on pointerdown,
	// then repeatedly while held, until pointerup/leave/cancel.
	const pressHold = (node: HTMLElement, callback: () => void) => {
		let timeoutId: number | null = null;
		let intervalId: number | null = null;

		const clear = () => {
			if (timeoutId !== null) clearTimeout(timeoutId);
			if (intervalId !== null) clearInterval(intervalId);
			timeoutId = null;
			intervalId = null;
		};

		const onPointerDown = (e: PointerEvent) => {
			e.preventDefault();
			callback();
			timeoutId = window.setTimeout(() => {
				intervalId = window.setInterval(callback, HOLD_INTERVAL);
			}, HOLD_DELAY);
		};

		node.addEventListener('pointerdown', onPointerDown);
		node.addEventListener('pointerup', clear);
		node.addEventListener('pointerleave', clear);
		node.addEventListener('pointercancel', clear);

		return {
			destroy() {
				clear();
				node.removeEventListener('pointerdown', onPointerDown);
				node.removeEventListener('pointerup', clear);
				node.removeEventListener('pointerleave', clear);
				node.removeEventListener('pointercancel', clear);
			}
		};
	};

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
	const decrement = () => (bpm = Math.max(30, bpm - 1));
	const increment = () => (bpm = Math.min(300, bpm + 1));

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
				use:pressHold={decrement}
				class="border-2 border-primary px-3 py-1 font-bold select-none hover:bg-primary hover:text-primary-foreground"
				aria-label="Decrease tempo"
			>
				−
			</button>
			<div class="w-20 text-center">
				<div class="text-3xl font-bold text-primary">{bpm}</div>
				<div class="text-xs">BPM</div>
			</div>
			<button
				use:pressHold={increment}
				class="border-2 border-primary px-3 py-1 font-bold select-none hover:bg-primary hover:text-primary-foreground"
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
