<script lang="ts">
	import { script, t } from '$lib/convert';
	const PHRASES = [
		{
			ain: 'Irankarapte!',
			ja: 'こんにちは！',
			en: 'Hello!',
			ru: 'Привет!'
		},
		{
			ain: 'Iyayraykere!',
			ja: 'ありがとうございます！',
			en: 'Thank you very much!',
			ru: 'Спасибо большое!'
		},
		{
			ain: 'E=ywanke ya?',
			ja: 'お元気ですか？',
			en: 'How are you?',
			ru: 'Как дела?'
		},
		{
			ain: 'Hioy’oy!',
			ja: 'ありがとう！',
			en: 'Thanks!',
			ru: 'Спасибо!'
		},
		{
			ain: 'Apunno sini yan!',
			ja: 'お休みなさい！',
			en: 'Good night!',
			ru: 'Спокойной ночи!'
		},
		{
			ain: 'Apunno paye yan!',
			ja: 'いってらっしゃい！',
			en: 'Goodbye!',
			ru: 'До свидания!'
		},
		{
			ain: 'Apunno okay yan!',
			ja: 'いってきます！',
			en: 'Stay well!',
			ru: 'Будьте здоровы!'
		},
		{
			ain: 'E=rehe makanaka an?',
			ja: 'お名前はなんですか？',
			en: 'What is your name?',
			ru: 'Как вас зовут?'
		},
		{
			ain: 'Somo.',
			ja: 'いいえ',
			en: 'No',
			ru: 'Нет'
		},
		{
			ain: 'E.',
			ja: 'はい',
			en: 'Yes',
			ru: 'Да'
		},
		{
			ain: 'Ku=yayapapu.',
			ja: 'ごめんなさい',
			en: 'Sorry',
			ru: 'Извините'
		},
		{
			ain: 'Ononno!',
			ja: 'おめでとう！',
			en: 'Congratulations!',
			ru: 'Поздравляю!'
		},
		{
			ain: 'Iyaykipte',
			ja: '危ない！',
			en: 'Danger!',
			ru: 'Опасно!'
		}
	];

	let currentScript = $state<'Latn' | 'Kana' | 'Cyrl'>('Latn');
	script.subscribe((value) => {
		currentScript = value;
	});

	import { convert } from 'ainconv';

	let index = $state(Math.floor(Math.random() * PHRASES.length));
	let phrase = $derived(PHRASES[index]);

	let showMeaning = $state(false);

	import MaterialSymbolsSync from '~icons/material-symbols/sync';
</script>

<div class="flex flex-col items-center justify-center">
	<p class="text-[4em] font-bold italic text-slate-800">{$t(phrase.ain)}</p>
	<p class="flex flex-row gap-4 text-center items-center justify-center text-lg text-slate-800">
		{#each ['Latn', 'Kana', 'Cyrl'] as const as script}
			{#if script !== currentScript}
				<span lang="ain-{script}">{convert(phrase.ain, 'Latn', script)}</span>
			{/if}
		{/each}
	</p>
	<button
		onclick={() => {
			showMeaning = !showMeaning;
		}}
		title={$t(`${showMeaning ? 'Somo i' : 'I'}takipe a=nukar`)}
		class="px-6 py-2 rounded-md my-6 relative group/meaning"
	>
		<span class:blur={!showMeaning} class="flex flex-row items-center justify-center gap-2">
			{#each ['ja', 'en', 'ru'] as lang}
				<span>
					{phrase[lang as 'ja' | 'en' | 'ru']}
				</span>
			{/each}
		</span>
		{#if !showMeaning}
			<div
				class="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover/meaning:opacity-100 transition-opacity duration-300"
			>
				Itak’ipe a=nukar
			</div>
		{/if}
	</button>

	<button
		onclick={() => {
			showMeaning = false;
			index = (index + 1) % PHRASES.length;
		}}
		class="flex flex-row items-center justify-center gap-2 text-white bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-800 my-10"
	>
		<MaterialSymbolsSync />
		{$t('Asir Itak')}
	</button>
</div>
