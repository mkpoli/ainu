<script lang="ts">
	import { tick } from 'svelte';
	import { caret } from '$lib/caret';
	import SuggestionBox from './SuggestionBox.svelte';
	import { dictionary } from '$lib/data/dictionary';

	interface Props {
		value?: string;
		lang?: string;
		[key: string]: any;
	}

	let { value = $bindable(''), lang = 'ain', ...rest }: Props = $props();

	let suggestionBox: HTMLDivElement | undefined = $state();

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

	let suggestions: string[] = $derived(compileSuggestions(value, caretPos, dictionary));
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
