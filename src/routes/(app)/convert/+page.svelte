<script lang="ts">
	import {
		t,
		convertLatn2Kana,
		convertKana2Latn,
		convertLatn2Cyrl,
		convertCyrl2Latn,
		convertKana2Cyrl,
		convertCyrl2Kana
	} from '$lib/convert';
	import Textarea from '$lib/ime/Textarea.svelte';
	import IcBaselineContentCopy from '~icons/ic/baseline-content-copy';

	let input: string = '';
	let converted: string = '';

	let lastConverted: string = '';

	type Mode = 'Latn2Kana' | 'Latn2Cyrl' | 'Kana2Latn' | 'Cyrl2Latn' | 'Kana2Cyrl' | 'Cyrl2Kana';

	$: {
		try {
			switch (mode) {
				case 'Latn2Kana':
					converted = convertLatn2Kana(input);
					break;
				case 'Latn2Cyrl':
					converted = convertLatn2Cyrl(input);
					break;
				case 'Kana2Latn':
					converted = convertKana2Latn(input);
					break;
				case 'Cyrl2Latn':
					converted = convertCyrl2Latn(input);
					break;
				case 'Kana2Cyrl':
					converted = convertKana2Cyrl(input);
					break;
				case 'Cyrl2Kana':
					converted = convertCyrl2Kana(input);
					break;
			}
			lastConverted = converted;
		} catch (e) {
			converted = lastConverted;
		}
	}

	let mode: Mode = 'Latn2Kana';
</script>

<svelte:head>
	<title>{$t('Aynuitak-Itokpa-Inuye Eutasare')}</title>
</svelte:head>

<main>
	<h1>{$t('Aynuitak-Itokpa-Inuye Eutasare')}</h1>
	<select bind:value={mode}>
		<option value="Latn2Kana">Romaunkur-itakitokpa → カタカナ イタキトㇰパ</option>
		<option value="Latn2Cyrl">Romaunkur-itakitokpa → Нуча-Итакитокпа</option>
		<option value="Kana2Latn">カタカナ イタキトㇰパ → Romaunkur-itakitokpa</option>
		<option value="Cyrl2Latn">Нуча-Итакитокпа → Romaunkur-itakitokpa</option>
		<option value="Kana2Cyrl">カタカナ イタキトㇰパ → Нуча-Итакитокпа</option>
		<option value="Cyrl2Kana">Нуча-Итакитокпа → カタカナ イタキトㇰパ</option>
	</select>

	<!-- <textarea class="input" bind:value={input} /> -->
	<Textarea style="height: fit-content;" bind:value={input} lang={`ain-${mode.slice(0, 4)}`} />

	<output>
		<button
			on:click={() => {
				navigator.clipboard.writeText(converted);
			}}
		>
			<IcBaselineContentCopy />
		</button>
		<textarea lang={`ain-${mode.slice(5)}`} value={converted} readonly />
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

	:global(textarea) {
		width: 100%;
		height: 10em;
		font-size: 1.5em;
		font-family: sans-serif;
		resize: none;
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
