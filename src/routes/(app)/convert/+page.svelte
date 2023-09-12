<script lang="ts">
	import { t, convertLatn2Kana } from '$lib/convert';
	import IcBaselineContentCopy from '~icons/ic/baseline-content-copy';
	let input: string = '';
	let converted: string = '';

	let lastConverted: string = '';

	$: {
		try {
			converted = convertLatn2Kana(input.toLowerCase());
			lastConverted = converted;
		} catch (e) {
			converted = lastConverted;
		}
	}
</script>

<main>
	<h1>{$t('Aynuitaki-tokpa Inuye Eutasare')}</h1>
	<select disabled>
		<option value="Latn2Kana">Romaunkur-itakitokpa → カタカナ イタキトㇰパ</option>
		<!-- <option value="Latn2Kana">Romaunkur-itakitokpa → カタカナ イタキトㇰパ</option> -->
	</select>

	<textarea class="input" bind:value={input} />

	<output>
		<button
			on:click={() => {
				navigator.clipboard.writeText(converted);
			}}
		>
			<IcBaselineContentCopy />
		</button>
		<textarea value={converted} readonly />
	</output>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 1.5em;
	}

	output {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 100%;
	}

	textarea {
		width: 100%;
		height: 10em;
		font-size: 1.5em;
		font-family: sans-serif;
		resize: none;
	}

	textarea.input {
		height: fit-content;
	}

	output textarea {
		background-color: #fbfbfb;
	}

	select {
		width: 100%;
		font-size: 1em;
		font-family: sans-serif;
		line-height: 1.5em;
		padding: 0.5em;
	}

	button {
		appearance: none;
		border: none;
		background: none;
		color: inherit;
		font-size: 1em;
		padding: 0.5em;
		position: absolute;
		top: 0;
		right: 0;
	}

	button:hover {
		filter: brightness(0.8) drop-shadow(0 0 0.5em #000000);
	}
</style>
