<script lang="ts">
	let contentType = $state('iframe');
</script>

<h2>Tilføj indhold</h2>
<form>
	<select bind:value={contentType}>
		<option value="pdf">pdf</option>
		<option value="iframe">iframe</option>
	</select>

	{#if contentType === 'iframe'}
		lol
	{/if}
</form>
