<script lang="ts">
	import { script, t, convertLatn2Kana } from '$lib/convert';

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

	<textarea bind:value={input} />

	<output>
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
		display: contents;
	}

	textarea {
		width: 100%;
		height: 10em;
		font-size: 1.5em;
		font-family: sans-serif;
		resize: none;
	}
</style>
