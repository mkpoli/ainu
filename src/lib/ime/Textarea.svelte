<script lang="ts">
	export let value: string = '';
	export let lang: string = 'ain';

	import { tick } from 'svelte';
	import { caret } from '$lib/caret';
	import SuggestionBox from './SuggestionBox.svelte';

	import WORD_FREQ_LIST from '$data/word_freq.tsv';
	import EXTRA_WORD_LIST from '$data/already_exists.txt?raw';
	const PERSONAL_AFFIXES = [
		'ku=',
		'k=',
		'a=',
		'ci=',
		'eci=',
		'e=',
		'i=',
		'en=',
		'un=',
		'=an',
		'=as'
	];

	const dictionary = [
		...WORD_FREQ_LIST,
		...PERSONAL_AFFIXES.map((word) => ({ word, freq: 9999 })),
		...EXTRA_WORD_LIST.split('\n')
			.filter(
				(word) =>
					word &&
					!PERSONAL_AFFIXES.includes(word) &&
					!WORD_FREQ_LIST.find(({ word: w }) => w === word)
			)
			.map((word) => ({ word, freq: 0 }))
	];

	let suggestionBox: HTMLDivElement;

	let suggestions: string[] = ['a', 'b', 'c'];

	// function getLastChar()

	function compileSuggestions(
		input: string,
		caretPos: number,
		dictionary: { word: string; freq: number }[]
	): string[] {
		// Get substring until caret position
		const sub = input.slice(0, caretPos);

		// Get the last word
		const lastWord = sub.split(/[\s\W]/).pop();

		if (!lastWord) return [];
		return dictionary
			.filter(({ word }) => word.startsWith(lastWord))
			.toSorted((a, b) => b.freq - a.freq)
			.toSorted((a, b) => a.word.length - b.word.length)
			.map(({ word }) => word);
	}

	$: suggestions = compileSuggestions(value, caretPos, dictionary);

	let textArea: HTMLTextAreaElement;

	let caretRect: DOMRect | undefined = undefined;
	let caretPos: number = 0;
</script>

<div>
	<SuggestionBox
		bind:box={suggestionBox}
		{suggestions}
		rect={caretRect}
		{textArea}
		on:select={async ({ detail: repl }) => {
			const beforeCaret = value.slice(0, caretPos);
			const lastWord = beforeCaret.split(/[\s\W]/).pop();
			if (!lastWord) return;
			const afterCaret = value.slice(caretPos);
			value =
				beforeCaret.slice(0, -lastWord.length) +
				repl +
				(afterCaret.startsWith(' ') ? '' : ' ') +
				afterCaret;
			await tick();
			textArea.setSelectionRange(
				value.length - afterCaret.length,
				value.length - afterCaret.length
			);
		}}
	/>

	<textarea
		{lang}
		class="text-box input-box"
		bind:value
		bind:this={textArea}
		use:caret
		on:caretmove={({
			detail: {
				rect,
				selection: { end }
			}
		}) => {
			caretRect = rect;
			caretPos = end;
		}}
		{...$$restProps}
	/>
</div>

<style>
	div {
		width: 100%;
		height: auto;
		position: relative;
	}

	textarea {
		width: 100%;
		height: 10em;
		resize: none;
	}
</style>
