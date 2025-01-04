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

		for (const [lineIndex, line] of lines.entries()) {
			let currentChar = 0;

			const sentenceParts = line.split(/(\.\s*)/);

			for (let i = 0; i < sentenceParts.length; i++) {
				const part = sentenceParts[i];

				if (i % 2 === 0) {
					const sentence = part.trim();

					if (sentence.length > 0) {
						if (checkHead && sentence[0].toLowerCase() === sentence[0]) {
							errors.push({
								line: lineIndex,
								char: currentChar,
								sentence: sentence,
								error: '文の頭文字が小文字です'
							});
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
		errorIndex?: number; // Index into errors array if error exists
	};

	let segments: Segment[] = $derived.by(() => {
		const findErrorAt = (
			wordStart: number,
			wordEnd: number,
			errors: GrammarError[]
		): number | undefined => {
			const index = errors.findIndex((error) => {
				return error.char >= wordStart && error.char < wordEnd;
			});
			return index === -1 ? undefined : index;
		};

		const segments: Segment[] = [];

		const lines = input.split('\n');

		for (let i = 0; i < lines.length; i++) {
			const lineText = lines[i];
			const lineErrors = errors.filter((e) => e.line === i);

			let currentIndex = 0;

			const regex = /(\w+|\W+)/g;
			let match: RegExpExecArray | null;

			while ((match = regex.exec(lineText)) !== null) {
				const token = match[0];
				const tokenStart = match.index;
				const tokenEnd = tokenStart + token.length;

				console.log({ token, tokenStart, tokenEnd, lineErrors });

				if (/\w+/.test(token)) {
					const errorIndex = findErrorAt(tokenStart, tokenEnd, lineErrors);
					segments.push({
						text: token,
						errorIndex: errorIndex
					});
				} else {
					segments.push({
						text: token
					});
				}

				currentIndex = tokenEnd;
			}

			if (i < lines.length - 1) {
				segments.push({
					text: '\n'
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
				{#if segment.errorIndex !== undefined}
					<span
						class="underline decoration-red-500 underline-offset-2"
						title={errors?.[segment.errorIndex]?.error}>{segment.text}</span
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
					{error.line}行目 {error.char}文字目: {error.sentence}
					{error.error}
				</li>
			{/each}
		</ul>
	</output>
</main>
