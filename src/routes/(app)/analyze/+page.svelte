<script lang="ts">
	import { tokenize, type Token } from '$lib/tokenize';
	import Textarea from '$lib/ime/Textarea.svelte';
	import { t } from '$lib/convert';
	import { groupTokens, type TokenGroup, type UposToken } from '$lib/analyze';
	interface Props {
		input?: string;
	}

	let { input = $bindable('Irankarapte! Mkpoli sekor ku=rehe an. itak=as awa pon rupne aynu ene itaki.\n\nIskar emko ta sino nispa a=ne hine an=an hike pak ison kur isam ison kur a=ne, pirka menoko a=macihi ne wa a=hekote katkemat po hene, i=pirkakor kor i=nunuke kor oka=an pe ne kor ora posak=an wa poeykoytupa=an sin uma po hene po eykoytupa kor an hawe ene an hi. “kotan kor nispa sine matnepo kor wa katu a=nukar noyne pirka katu pirka menoko ne ruwe ne na, ponmat ne etun yan. yakne po kor yakne ikoyomap poka =an kus ne na.” sekor kane hawean ruwe  ne korka a=erampokiwen a=iruskare ka erampokiwen kus nena a=kosomotasnu wa an=an a p konto ipe ka  somo ki no cis kor ye hi kusu oraun a=etun akusu pon yupihi  poro yupihi onaha unuhu an pe ne p ramuosma pa hine mat ne a=etun h ine pon mat ne a=kor ruwe ne akus  nani honkor hine,  pirka okkayo poison kor ruwe ne akusu orano nea iunune p tekehe kere siri ka isam no a=poro maci patek huraye ne ya kay ne ya ki sorekusu arikiki p ne kus  nen nen nukannukar kor oka=an ruwe ne ayne tane pastetterke apkas wa earkinne sukupasnu wa po a=ey aykopuntek kor oka=an rapokke tane a=kor son a=eyam wa somo  kimun=an a korka hanke kuca cise ka a=kor tuyma kuca cise ka a=kor pe ne hi kusu') }: Props = $props();

	let grouped: TokenGroup[] = $state([]);

	async function parse() {
		const res = await fetch('/api/upos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: input
		});
		const result = (await res.json()) as {
			entity_group: string;
			word: string;
			start: number;
			end: number;
		}[];
		console.log('result', result);

		const tokens = tokenize(input);

		const uposTokens: UposToken[] = result.map(({ entity_group, word, start, end }) => ({
			lemma: word,
			position: [start, end],
			upos: entity_group.split('|')[0],
			xpos: entity_group.split('|')[1]
		}));
		console.log('uposTokens', uposTokens);

		grouped = groupTokens(tokens, uposTokens);
		console.log('grouped', grouped);
	}
</script>

<svelte:head>
	<title>Morphological Analysis (yaykopekerka)</title>
</svelte:head>

<main>
	<h1>{$t('Aynuitak Itak-ikiri Usaraye')}</h1>
	<Textarea style="height: 15em;" bind:value={input} />
	<!-- <textarea bind:value={input} /> -->
	<button class="primary" onclick={parse}>{$t('a=usaraye')}</button>
	<p>
		<a href="https://huggingface.co/KoichiYasuoka/deberta-base-ainu-upos"
			>🤗KoichiYasuoka/deberta-base-ainu-upos</a
		>
		for POS tagging.
	</p>
	<output>
		{#each grouped as { tokens, uposTokens }}
			<div class="token">
				<div class="surfaces">
					{#each tokens as { surface }}
						<div class="surface">{surface}</div>
					{/each}
					<!-- <div class="surface">{token.surface}</div> -->
				</div>
				<div class="upos-tokens">
					{#each uposTokens as { lemma, upos, xpos }}
						<div class="upos-token" data-upos={upos}>
							<div>{lemma}</div>
							<div>{upos}</div>
							<div>{xpos}</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</output>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1em;
		gap: 1em;
	}

	output {
		font-size: 0.8em;
	}

	.token {
		display: inline-flex;
		flex-direction: column;
		margin-right: 0.5em;
		margin-bottom: 1em;

		border: 1px solid #ccc;
		padding: 0.125em;
	}

	.surfaces {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
	}

	.upos-tokens {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
	}

	.upos-token {
		display: flex;
		flex-direction: column;
		border-radius: 0.25em;
	}

	/* Noun-like */
	.upos-token[data-upos='NOUN'] {
		background-color: rgba(255, 0, 0, 0.2);
	}
	.upos-token[data-upos='PRON'] {
		background-color: rgba(255, 50, 50, 0.2);
	}
	.upos-token[data-upos='PROPN'] {
		background-color: rgba(255, 100, 100, 0.2);
	}

	/* Verb-like */
	.upos-token[data-upos='VERB'] {
		background-color: rgba(0, 255, 0, 0.2);
	}
	.upos-token[data-upos='AUX'] {
		background-color: rgba(0, 255, 50, 0.2);
	}

	/* Adjective-like */
	.upos-token[data-upos='ADJ'] {
		background-color: rgba(0, 0, 255, 0.2);
	}

	/* Adverb-like */
	.upos-token[data-upos='ADV'] {
		background-color: rgba(255, 255, 0, 0.2);
	}
	.upos-token[data-upos='ADP'] {
		background-color: rgba(255, 255, 50, 0.2);
	}

	/* Punctuation */
	.upos-token[data-upos='PUNCT'] {
		background-color: rgba(176, 176, 176, 0.2);
	}

	/* Function words */
	.upos-token[data-upos='SCONJ'] {
		background-color: rgba(128, 128, 0, 0.2);
	}
	.upos-token[data-upos='CCONJ'] {
		background-color: rgba(128, 0, 128, 0.2);
	}
	.upos-token[data-upos='PART'] {
		background-color: rgba(0, 128, 128, 0.2);
	}
	.upos-token[data-upos='DET'] {
		background-color: rgba(100, 100, 100, 0.2);
	}

	/* Others */
	.upos-token[data-upos='NUM'] {
		background-color: rgba(255, 128, 0, 0.2);
	}
	.upos-token[data-upos='SYM'] {
		background-color: rgba(0, 255, 255, 0.2);
	}
	.upos-token[data-upos='INTJ'] {
		background-color: rgba(255, 0, 255, 0.2);
	}
	.upos-token[data-upos='X'] {
		background-color: rgba(0, 0, 0, 0.2);
	}

	p {
		margin: 0.5em;
		font-size: 0.9em;
	}
</style>
