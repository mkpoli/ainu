<script lang="ts">
	let checkHead = $state(true);

	let input = $state('');

	type GrammarError = {
		line: number;
		char: number;
		sentence: string;
		error: string;
	};

	let errors: GrammarError[] = $derived.by(() => {
		if (!input) return [];

		const lines = input.split(/\r?\n/);
		const errors: GrammarError[] = [];

		for (const [lind, line] of lines.entries()) {
			for (const sentence of line.split(/(.*?\.\s*)/)) {
				if (!sentence) continue;

				if (checkHead && sentence[0].toLowerCase() === sentence[0]) {
					errors.push({
						line: lind,
						char: line.indexOf(sentence),
						sentence,
						error: '文頭頭文字が小文字です'
					});
				}
			}
		}

		return errors;
	});

	type Segment = {
		text: string;
		hasError: boolean;
	};

	let segments: Segment[] = $derived.by(() => {
		const lines = input.split('\n');
		const segments: Segment[] = [];

		for (let i = 0; i < lines.length; i++) {
			const lineText = lines[i];
			// Find errors for this line and sort by char position
			const lineErrors = errors.filter((e) => e.line === i).sort((a, b) => a.char - b.char);

			let currentIndex = 0;
			for (const err of lineErrors) {
				const startIndex = err.char;
				const endIndex = startIndex + err.sentence.length;
				// Non-error segment (before the error)
				if (startIndex > currentIndex) {
					segments.push({
						text: lineText.slice(currentIndex, startIndex),
						hasError: false
					});
				}
				// Error segment
				segments.push({
					text: lineText.slice(startIndex, endIndex),
					hasError: true
				});
				currentIndex = endIndex;
			}
			// Remaining segment (after the last error in the line)
			if (currentIndex < lineText.length) {
				segments.push({
					text: lineText.slice(currentIndex),
					hasError: false
				});
			}
			// If you want to preserve newlines explicitly
			if (i < lines.length - 1) {
				segments.push({
					text: '\n',
					hasError: false
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
		<div class="pointer-events-none absolute inset-0 whitespace-pre-line break-all border p-4">
			{#each segments as segment}
				{#if segment.hasError}
					<span class="underline decoration-red-500 underline-offset-2">{segment.text}</span>
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
					{error.line}行目 {error.char}文字目: {error.sentence}
					{error.error}
				</li>
			{/each}
		</ul>
	</output>
</main>
