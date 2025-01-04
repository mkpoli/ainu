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

	<textarea
		placeholder="文法チェックしたい文を入力してください"
		bind:value={input}
		class="m-auto min-h-48 w-full max-w-prose"
	></textarea>

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
