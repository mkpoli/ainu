<script lang="ts">
	import { run } from 'svelte/legacy';

	import { tick } from 'svelte';
	import { caret } from '$lib/caret';
	import SuggestionBox from './SuggestionBox.svelte';

	import WORD_FREQ_LIST from '$data/word_freq.tsv';
	import EXTRA_WORD_LIST from '$data/already_exists.txt?raw';
	interface Props {
		value?: string;
		lang?: string;
		[key: string]: any;
	}

	let { value = $bindable(''), lang = 'ain', ...rest }: Props = $props();
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

	let suggestionBox: HTMLDivElement | undefined = $state();

	let suggestions: string[] = $state(['a', 'b', 'c']);

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

	let textArea: HTMLTextAreaElement | undefined = $state();

	let caretRect: DOMRect | undefined = $state(undefined);
	let caretPos: number = $state(0);
	run(() => {
		suggestions = compileSuggestions(value, caretPos, dictionary);
	});
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
			textArea?.setSelectionRange(
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
		oncaretmove={({
			detail: {
				rect,
				selection: { end }
			}
		}) => {
			caretRect = rect;
			caretPos = end;
		}}
		{...rest}
	></textarea>
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
