<script lang="ts">
	import { run } from 'svelte/legacy';
	import { options } from '$lib/options.svelte';
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

	let input: string = $state('');
	let converted: string = $state('');

	let lastConverted: string = $state('');

	type Mode = 'Latn2Kana' | 'Latn2Cyrl' | 'Kana2Latn' | 'Cyrl2Latn' | 'Kana2Cyrl' | 'Cyrl2Kana';

	function convertPunctuations(text: string) {
		switch (mode) {
			case 'Latn2Kana':
			case 'Cyrl2Kana':
				text = text.replaceAll(/, ?/g, '、');
				text = text.replaceAll(/\. ?/g, '。');
				text = text.replaceAll(/; ?/g, '；');
				text = text.replaceAll(/! ?/g, '！');
				text = text.replaceAll(/\? ?/g, '？');
				break;
			case 'Kana2Latn':
			case 'Cyrl2Latn':
				text = text.replaceAll(/、/g, ', ');
				text = text.replaceAll(/；/g, '; ');
				text = text.replaceAll(/！/g, '! ');
				text = text.replaceAll(/？/g, '? ');
				break;
			default:
				break;
		}
		return text;
	}

	let mode: Mode = $state('Latn2Kana');
	$effect(() => {
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
			converted = options.punctuation ? convertPunctuations(converted) : converted;
			if (mode.endsWith('Kana') && converted.includes('ト゚')) {
				converted = converted.replaceAll('ト゚', options.tu_as);
				converted = converted.replaceAll('ㇺプ', options.mp_as);
			}
			if (mode === 'Latn2Kana' && converted.includes(' p ')) {
				converted = converted.replaceAll(' p ', ' ㇷ゚ ');
			}
			lastConverted = converted;
		} catch (e) {
			converted = lastConverted;
		}
	});
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
			onclick={() => {
				navigator.clipboard.writeText(converted);
			}}
		>
			<IcBaselineContentCopy />
		</button>
		<textarea lang={`ain-${mode.slice(5)}`} value={converted} readonly></textarea>
	</output>

	<fieldset
		class="flex flex-col items-center gap-2 rounded-lg border border-black px-6 py-4 transition-all focus-within:border-blue-700 focus-within:text-blue-700"
	>
		<legend class="px-1 text-lg font-bold">{$t('Inumke')}</legend>
		<div class="flex flex-col gap-4 text-black">
			<div class="flex items-center gap-2">
				<input type="checkbox" bind:checked={options.punctuation} id="punctuation" />
				<label for="punctuation">{$t('Aytaksay’usarayep a=tupte')}</label>
			</div>

			{#if mode.endsWith('Kana')}
				<div style="display: flex; align-items: center;">
					<div>tu/ту →</div>
					<input type="radio" bind:group={options.tu_as} id="tu_as" value="トゥ" />
					<label for="tu_as" style="padding: 0 0.25em;">トゥ</label>
					<input type="radio" bind:group={options.tu_as} id="tu_d" value="ト゚" />
					<label for="tu_d" style="padding: 0 0.25em;">ト゚</label>
					<input type="radio" bind:group={options.tu_as} id="tsu_d" value="ツ゚" />
					<label for="tsu_d" style="padding: 0 0.25em;">ツ゚</label>
				</div>

				<div style="display: flex; align-items: center;">
					<div>mp/мп →</div>
					<input type="radio" bind:group={options.mp_as} id="mp_as" value="ンプ" />
					<label for="mp_as" style="padding: 0 0.25em;">ンプ</label>
					<input type="radio" bind:group={options.mp_as} id="mp_d" value="ㇺプ" />
					<label for="mp_d" style="padding: 0 0.25em;">ㇺプ</label>
				</div>
			{/if}
		</div>
	</fieldset>

	<h2>{$t('Ipiskikarpe Porokram')}</h2>
	<ul>
		<li>
			<a href="https://www.npmjs.com/package/ainconv" target="_blank" rel="noopener">
				ainconv - NPM (JavaScript)
			</a>
		</li>
		<li>
			<a href="https://crates.io/crates/ainconv" target="_blank" rel="noopener">
				ainconv - Crates.io (Rust)
			</a>
		</li>
		<li>
			<a href="https://pypi.org/project/ainconv/" target="_blank" rel="noopener">
				ainconv - PyPI (Python)
			</a>
		</li>
	</ul>
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
