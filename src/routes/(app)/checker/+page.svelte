<script lang="ts">
	import { dictionary } from '$lib/data/dictionary';
	import Fuse from 'fuse.js';
	const dictionarySet: Set<string> = new Set(dictionary.map((entry) => entry.word.toLowerCase()));

	let checkHead = $state(true);

	let input = $state('');

	const fuse = new Fuse([...dictionarySet], {
		threshold: 0.5
	});

	type GrammarError = {
		line: number;
		char: number;
		word: string;
		error: string;
		errorType: 'warning' | 'error';
		correction?: string;
	};

	let errors: GrammarError[] = $derived.by(() => {
		if (!input) return [];

		const lines = input.split(/\r?\n/);
		const errors: GrammarError[] = [];

		for (const [lineIndex, line] of lines.entries()) {
			let currentChar = 0;

			const sentenceParts = line.split(/(\.\s*)/);

			for (let i = 0; i < sentenceParts.length; i++) {
				const part = sentenceParts[i];

				if (i % 2 === 0) {
					const sentence = part.trim();

					if (sentence.length > 0) {
						const words = sentence.split(/\b/); // Splits by word boundaries
						const firstWord = words.find((w) => /\w+/.test(w));
						// 文頭頭文字が小文字であるかチェック

						// 文頭頭文字が小文字であるかチェック (Check if the first character of the first word is lowercase)
						if (checkHead && firstWord && firstWord[0].toLowerCase() === firstWord[0]) {
							errors.push({
								line: lineIndex,
								char: currentChar,
								word: firstWord, // Associate error with the first word
								error: '文の頭文字が小文字です',
								errorType: 'error',
								correction: firstWord[0].toUpperCase() + firstWord.slice(1)
							});
						}

						let wordStartInSentence = 0; // Position within the sentence

						// スペルチェッカー
						words.forEach((word) => {
							const isWord = /\w+/.test(word);
							if (isWord) {
								const normalizedWord = word.toLowerCase();
								if (!dictionarySet.has(normalizedWord)) {
									errors.push({
										line: lineIndex,
										char: currentChar + wordStartInSentence,
										word: word,
										error: '未知語',
										errorType: 'warning',
										correction: fuse.search(normalizedWord)?.[0]?.item
									});
								}
							}
							wordStartInSentence += word.length;
						});

						for (const [index, word] of words.entries()) {
							if (index + 1 >= words.length || index - 1 < 0) continue;
							if (word !== '=') continue;
							const wordBefore = words[index - 1];
							const wordAfter = words[index + 1];
							const nextChar = wordAfter[0];

							if (['k', 'c'].includes(wordBefore) && !['a', 'u', 'e', 'o'].includes(nextChar)) {
								//  Sar dialect
								errors.push({
									line: lineIndex,
									char: currentChar + word.length - wordBefore.length,
									word: wordBefore + word + wordAfter,
									error: 'a, u, e, o の前以外 ci=, ku= の母音の脱落が起きない',
									errorType: 'error',
									correction:
										{
											k: 'k',
											c: 'c'
										}[wordBefore] +
										word +
										wordAfter
								});
							}

							if (['ku', 'ci'].includes(wordBefore) && ['a', 'u', 'e', 'o'].includes(nextChar)) {
								errors.push({
									line: lineIndex,
									char: currentChar + word.length - wordBefore.length,
									word: wordBefore + word + wordAfter,
									error: '沙流方言では ci=, ku= が a, u, e, o の前で c=, k= になる',
									errorType: 'warning',
									correction:
										{
											ku: 'k',
											ci: 'c'
										}[wordBefore] +
										word +
										wordAfter
								});
							}
						}

						currentChar += part.length;
					}
				} else {
					currentChar += part.length;
				}
			}
		}

		return errors;
	});

	type Segment = {
		text: string;
		errorIndices: number[];
	};

	let segments: Segment[] = $derived.by(() => {
		const segments: Segment[] = [];
		const lines = input.split('\n');

		for (let i = 0; i < lines.length; i++) {
			const lineText = lines[i];
			const lineErrors = errors
				.map((error, index) => ({ ...error, index }))
				.filter((e) => e.line === i);

			let currentIndex = 0;

			const regex = /(\w+|\W+)/g;
			let match: RegExpExecArray | null;

			while ((match = regex.exec(lineText)) !== null) {
				const token = match[0];
				const tokenStart = match.index;
				const tokenEnd = tokenStart + token.length;

				// Find all errors that overlap with this token
				const overlappingErrors = lineErrors
					.filter((error) => {
						return error.char <= tokenStart && error.char + error.word.length >= tokenEnd;
					})
					.map((error) => error.index);

				if (/[\w=]+/.test(token)) {
					segments.push({
						text: token,
						errorIndices: overlappingErrors.length > 0 ? overlappingErrors : []
					});
				} else {
					segments.push({
						text: token,
						errorIndices: []
					});
				}

				currentIndex = tokenEnd;
			}

			if (i < lines.length - 1) {
				segments.push({
					text: '\n',
					errorIndices: []
				});
			}
		}
		return segments;
	});

	$inspect('errors', errors);
	$inspect('segments', segments);
</script>

<svelte:head>
	<title>文法チェッカー</title>
</svelte:head>

<main class="flex flex-col items-center gap-4 p-4">
	<h1 class="text-2xl font-bold">文法チェッカー</h1>

	<fieldset class="flex flex-col gap-2 rounded-md border-2 border-gray-300 p-2 pb-4">
		<legend class="p-2 text-lg font-bold">設定</legend>
		<label>
			方言
			<select>
				<option>北海道西南方言　日高西部　沙流</option>
			</select>
		</label>
		<label>
			文頭頭文字
			<input type="checkbox" bind:checked={checkHead} />
		</label>
	</fieldset>

	<div class="relative h-full min-h-48">
		<!-- Overlay -->
		<div class="pointer-events-none absolute inset-0 border p-4 break-all whitespace-pre-line">
			{#each segments as segment}
				{#if segment.errorIndices.length > 0}
					<span
						class={[
							'underline',
							'underline-offset-2',
							// All errors -> red
							// TODO: Error and warning -> orange
							// Warning -> yellow
							segment.errorIndices.some((index) => errors[index].errorType === 'error')
								? 'decoration-red-500'
								: 'decoration-yellow-500'
						]}
						title={segment.errorIndices.map((index) => errors[index].error).join('\n')}
						>{segment.text}</span
					>
				{:else}
					{segment.text}
				{/if}
			{/each}
		</div>
		<!-- Textarea -->
		<textarea
			placeholder="文法チェックしたい文を入力してください"
			bind:value={input}
			class="m-auto h-72 w-[75vw] max-w-prose resize-none border-none p-4 text-transparent"
		></textarea>
	</div>

	<output>
		<h2 class="text-lg font-bold">文法チェック結果</h2>
		<ul>
			{#each errors as error}
				<li>
					{error.line}行目 {error.char}文字目: {error.word}
					{error.error}{#if error.correction}
						<span class="text-blue-600">{error.correction}?</span>
					{/if}
				</li>
			{/each}
		</ul>
	</output>
</main>
