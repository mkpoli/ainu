<!-- @migration-task Error while migrating Svelte code: `<a>` is invalid inside `<a>` -->
<script lang="ts">
	import Ayus from '$assets/Ayus.svelte';
	import ScriptSelect from '$lib/ScriptSelect.svelte';
	import CitationEN from '$lib/bibliography/CitationEN.svelte';
	import { script, t } from '$lib/convert';
	import MaterialSymbolsFitbitArrowDownwardRounded from '~icons/material-symbols/fitbit-arrow-downward-rounded';
	import RiDiscordFill from '~icons/ri/discord-fill';
	import IconParkOutlineWritingFluently from '~icons/icon-park-outline/writing-fluently';
	import MaterialSymbolsBook2Outline from '~icons/material-symbols/book-2-outline';
	import LucideScroll from '~icons/lucide/scroll';
	import RiToolsFill from '~icons/ri/tools-fill';
	import MingcuteAiming2Line from '~icons/mingcute/aiming-2-line';
	import Projects from '~icons/eos-icons/project-outlined';
	import MaterialSymbolsDictionaryOutline from '~icons/material-symbols/dictionary-outline';
	import AkarIconsBookOpen from '~icons/akar-icons/book-open';
	import PhBooks from '~icons/ph/books';
	import aynuwikiScreenshot from '$assets/wiki.aynu.org.png';
	import wikipediaScreenshot from '$assets/wikipedia.incubator.png';
	import DictionaryTable from '$lib/DictionaryTable.svelte';
	import IcTwotoneLaunch from '~icons/ic/twotone-launch';
	import MaterialSymbolsTranslateRounded from '~icons/material-symbols/translate-rounded';
	import type { Component } from 'svelte';
	import TodaysAinuPhrase from '$lib/TodaysAinuPhrase.svelte';
	import CarbonPhraseSentiment from '~icons/carbon/phrase-sentiment';
</script>

<svelte:head>
	<title>{$t('Aynuitak-nuye Ukosamaani Sait')}</title>
</svelte:head>

<main>
	<section id="title">
		<div class="script-select-container">
			<ScriptSelect />
		</div>

		<div class="title-content">
			<Ayus />
			<div>
				<h1>{$t('Aynuitak-nuye Ukosamaani Sait')}</h1>
				<div role="doc-subtitle">
					<span lang="ja" class="font-Hina"> アイヌ語執筆支援サイト </span>
					<span lang="en"> Ainu Language Writing Support Site </span>
					<span lang="ru"> Сайт поддержки письма на айнском языке </span>
				</div>
			</div>
			<Ayus />

			<div class="sns">
				<a
					href="https://discord.gg/gbtc8sZTZ4"
					target="_blank"
					rel="noopener noreferrer"
					title="Discord"
				>
					<RiDiscordFill width="1.5em" />
				</a>
			</div>
		</div>

		<nav class="hidden flex-row items-center justify-center gap-4 py-4 md:flex">
			<a class="text-white" href="#aim">{$t('Cikosirepap')}</a>
			<a class="text-white" href="#projects">{$t('Cikarkoranpe')}</a>
			<a class="text-white" href="#tools">{$t('Aeywankep')}</a>
			<a class="text-white" href="#dicts">{$t('Aynuitak-Eonnekunnep')}</a>
			<a class="text-white" href="#books">{$t('Kampisos')}</a>
			<a class="text-white" href="#resource">{$t('Itaksay')}</a>
		</nav>
		<button
			onclick={() => {
				const section = document.querySelector('section:nth-of-type(2)');
				if (section) {
					section.scrollIntoView({ behavior: 'smooth' });
				}
			}}
			class="more"><MaterialSymbolsFitbitArrowDownwardRounded /></button
		>
	</section>
	<section id="today">
		<h2 class="flex flex-row items-center justify-center gap-2">
			<CarbonPhraseSentiment class="h-12 w-12" />
			{$t('Tanto Itak')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">今日のフレーズ</span>
			<span lang="en">Phrase of the Day</span>
			<span lang="ru">Фраза дня</span>
		</div>
		<main>
			<TodaysAinuPhrase />
		</main>
	</section>
	<section id="aim" class="bg-linear-to-b from-slate-200/50 to-slate-400/50">
		<h2>
			<MingcuteAiming2Line class="h-12 w-12" />
			{$t('Cikosirepap')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">目的</span>
			<span lang="en">Aim</span>
			<span lang="ru">Цель</span>
		</div>
		<main>
			<p class="text-xl">
				{$t('Aynuitak einuypa eukasuy wa tanesasuysir osiknuka.')}
			</p>
			<div class="translation flex-col text-lg">
				<span lang="ja">アイヌ語での文章作成を支援し、その現代化を促進する</span>
				<span lang="en"
					>To support the writing in Ainu and to promote the modernization of Ainu</span
				>
				<span lang="ru"
					>Поддержать письмо на айнском языке и способствовать его современному развитию</span
				>
			</div>
		</main>
	</section>
	<section id="projects">
		<h2>
			<Projects class="h-12 w-12" />
			{$t('Cikarkoranpe')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">プロジェクト</span>
			<span lang="en">Projects</span>
			<span lang="ru">Проекты</span>
		</div>

		<main class="cards">
			{#snippet projectCard(
				title: {
					ain: string;
					ja: string;
					en: string;
					ru: string;
				},
				link: string,
				image: string
			)}
				<a href={link} target="_blank" class="card text-inherit hover:no-underline">
					<h3 class="underline-black text-black hover:underline">{$t(title.ain)}</h3>
					<img class="card-image" src={image} alt={title.ain} />
					<div class="card-description" role="doc-subtitle">
						<span lang="ja">{$t(title.ja)}</span>
						<span lang="en">{$t(title.en)}</span>
						<span lang="ru">{$t(title.ru)}</span>
					</div>
				</a>
			{/snippet}
			{@render projectCard(
				{
					ain: 'Aynuwiki a=kar',
					ja: 'アイヌ語によるオンライン百科事典',
					en: 'Online Encyclopedia in Ainu',
					ru: 'Онлайн-энциклопедия на айнском языке'
				},
				'https://wiki.aynu.org/',
				aynuwikiScreenshot
			)}
			{@render projectCard(
				{
					ain: 'Wikipenciya a=kar',
					ja: 'ウィキペディア誕生プロジェクト',
					en: 'Wikipedia Incubator Project',
					ru: 'Проект Инкубатора Википедии'
				},
				'https://incubator.wikimedia.org/wiki/Wp/ain/Main%20Page',
				wikipediaScreenshot
			)}
		</main>
	</section>
	<section id="tools">
		<h2>
			<RiToolsFill class="h-12 w-12" />
			{$t('Aeywankep')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">ツール</span>
			<span lang="en">Tools</span>
			<span lang="ru">Инструменты</span>
		</div>
		<main class="cards flex flex-wrap">
			{#snippet toolCard(
				title: {
					ain: string;
					ja: string;
					en: string;
					ru: string;
				},
				link: string,
				Icon: Component,
				external: boolean
			)}
				<a
					class="card text-inherit hover:no-underline"
					href={link}
					target={external ? '_blank' : '_self'}
				>
					<h3 class="flex flex-col items-center justify-center gap-2">
						<Icon class="h-8 w-8" />
						<span class="flex items-center justify-center gap-1 hover:underline">
							{$t(title.ain)}{#if external}<IcTwotoneLaunch class="ml-1 inline h-4 w-4" />{/if}
						</span>
					</h3>
					<div class="card-description" role="doc-subtitle">
						<span lang="ja">{$t(title.ja)}</span>
						<span lang="en">{$t(title.en)}</span>
						<span lang="ru">{$t(title.ru)}</span>
					</div>
				</a>
			{/snippet}
			{@render toolCard(
				{
					ain: 'Ainuitak-Itokpa-Inuye Eutasare',
					ja: 'アイヌ語表記変換',
					en: 'Ainu Script Conversion',
					ru: 'Преобразование айнской письменности'
				},
				'/convert',
				IconParkOutlineWritingFluently,
				false
			)}
			{@render toolCard(
				{
					ain: 'Itak Irenka Katu A=Nukar',
					ja: 'アイヌ語文法チェッカー',
					en: 'Ainu Grammar Checker',
					ru: 'Айнский грамматический проверяющий'
				},
				'/checker',
				MaterialSymbolsTranslateRounded,
				true
			)}
			{@render toolCard(
				{
					ain: 'Ainuitak-Sisam’itak Tunci',
					ja: 'アイヌ語⇆日本語間自動翻訳',
					en: 'Ainu-Japanese Translator',
					ru: 'Айнский-Японский переводчик'
				},
				'https://tunci.aynu.io/',
				MaterialSymbolsTranslateRounded,
				true
			)}
			{@render toolCard(
				{
					ain: 'Wiktionary a=enuypap',
					ja: 'アイヌ語 Wiktionary 支援ツール',
					en: 'Ainu Wiktionary Helper',
					ru: 'Помощник Айнского Викисловаря'
				},
				'https://wikt.aynu.org/',
				MaterialSymbolsDictionaryOutline,
				true
			)}
		</main>
	</section>
	<section id="dicts">
		<h2>
			<MaterialSymbolsDictionaryOutline class="h-12 w-12" />
			{$t('Aynuitak-Eonnekunnep')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">アイヌ語辞書</span>
			<span lang="en">Ainu Dictionaries</span>
			<span lang="ru">Айнские словари</span>
		</div>
		<main>
			<DictionaryTable />
			<p><i>{$t('Ainuitak-Nucaitak-Eonnekunnep tane isam. a=eramuan yakun i=pakasnu yan!')}</i></p>
			<h3>
				{$t('Oya Rinko')}
			</h3>
			<ul class="w-content mx-auto list-disc">
				<li class="w-content">
					<a
						href="https://ja.wiktionary.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:Mkpoli/%E3%82%A2%E3%82%A4%E3%83%8C%E8%AA%9E%E8%AA%9E%E5%BD%99%E9%A0%BB%E5%BA%A6%E8%A1%A8"
					>
						利用者:Mkpoli/アイヌ語語彙頻度表 - ウィクショナリー日本語版
					</a>
				</li>
				<li class="w-content">
					<a
						href="https://ja.wiktionary.org/wiki/Wiktionary:%E3%82%A2%E3%82%A4%E3%83%8C%E8%AA%9E%E3%81%AE%E5%9F%BA%E6%9C%AC%E8%AA%9E%E5%BD%991000"
						>Wiktionary:アイヌ語の基本語彙1000</a
					>
				</li>
			</ul>
		</main>
	</section>

	<section id="books">
		<h2 class="">
			<PhBooks class="h-12 w-12" />
			{$t('Kampisos')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">書籍</span>
			<span lang="en">Books</span>
			<span lang="ru">Книги</span>
		</div>
		<main class="grid grid-cols-1 gap-4 xl:grid-cols-2">
			{#snippet card(
				Icon: Component,
				title: {
					ain: string;
					ja: string;
					en: string;
					ru: string;
				},
				books: Partial<
					Record<
						'ja' | 'en' | 'ru',
						{
							type: 'book' | 'article';
							title: string;
							link?: string;
							notes?: string;
							author?: string;
							publisher?: string;
							year?: string;
							book?: string;
						}[]
					>
				>
			)}
				<div
					class="grid h-full grid-cols-1 items-center justify-center gap-2 rounded-lg border-2 border-slate-400 bg-slate-100/50 px-6 py-4 shadow-lg"
				>
					<h3 class="flex items-center justify-center gap-2">
						<Icon class="h-8 w-8" />
						{title.ain}
					</h3>
					<div class="flex flex-row items-center justify-center gap-4">
						<span lang="ja">{title.ja}</span>
						<span lang="en">{title.en}</span>
						<span lang="ru">{title.ru}</span>
					</div>
					<ul>
						{#each Object.entries(books) as [lang, items]}
							{@const LANG_TITLE = {
								ja: 'Sisam’itak',
								en: 'Inkiriskur’itak',
								ru: 'Nucaitak'
							} as const}
							<h4 class="font-bold">{LANG_TITLE[lang as keyof typeof LANG_TITLE]}</h4>
							<li {lang}>
								<ul>
									{#each items as book}
										<li>
											{#if lang === 'ja'}
												<span class="text-sm">
													{book.author}
													{#if book.year}
														（{book.year}）
													{/if}
												</span>

												{#if book.type === 'book'}
													{book.book && `, ${book.book}`}
													『{#if book.link}
														<a href={book.link} target="_blank">
															{book.title}
														</a>
													{:else}{book.title}{/if}』
												{/if}
												<span class="text-sm">
													{book.publisher}
													{book.notes && `（${book.notes}）`}
												</span>
											{:else}
												<span class="text-sm">
													{#if book.author}
														{book.author}
													{/if}
													{#if book.year}
														({book.year})
													{/if}
												</span>
												<a href={book.link} class="italic" target="_blank">{book.title}</a>
												<span class="text-sm">
													{book.publisher && `, ${book.publisher}`}
													{book.notes && `, ${book.notes}`}
												</span>
											{/if}
										</li>
									{/each}
								</ul>
							</li>
						{/each}
					</ul>
				</div>
			{/snippet}

			<!-- textbooks -->
			{@render card(
				MaterialSymbolsBook2Outline,
				{
					ain: 'Cioypakasnup',
					ja: '教材',
					en: 'Textbooks',
					ru: 'Учебники'
				},
				{
					ja: [
						{
							type: 'book',
							author: '公益財団法人 アイヌ民族文化財団',
							title: 'アイヌ語教材テキスト',
							link: 'https://www.ff-ainu.or.jp/web/potal_site/details/post.html',
							notes: '各方言'
						},
						{
							type: 'book',
							author: 'STV',
							title: 'アイヌ語ラジオ講座',
							link: 'https://www.stv.jp/radio/ainugo/index.html',
							publisher: '財団法人アイヌ文化振興・研究推進機構',
							notes: '各方言'
						},
						{
							type: 'book',
							author: '中川裕',
							title: 'ニューエクスプレスプラス アイヌ語',
							link: 'https://www.hakusuisha.co.jp/book/b584600.html',
							publisher: '白水社',
							year: '2018',
							notes: '沙流方言'
						},
						{
							type: 'book',
							author: '丹菊逸治',
							title: 'ニューエクスプレス・スペシャル日本語の隣人たち　Ⅰ＋Ⅱ',
							link: 'https://www.hakusuisha.co.jp/book/b592865.html',
							publisher: '白水社',
							year: '2018',
							notes: '樺太アイヌ語'
						},
						{
							type: 'book',
							author: '日本語Wikibooks',
							title: 'アイヌ語',
							link: 'https://ja.wikibooks.org/wiki/%E3%82%A2%E3%82%A4%E3%83%8C%E8%AA%9E'
						}
					]
				}
			)}

			{@render card(
				LucideScroll,
				{
					ain: 'Itakirenkasos',
					ja: '文法書',
					en: 'Grammars',
					ru: 'Грамматики'
				},
				{
					ja: [
						{
							type: 'book',
							title: 'アイヌ語法概説',
							link: 'https://archive.org/details/ainugohgaisetsu00kind/',
							publisher: '岩波書店',
							year: '1936',
							author: '金田一京助・知里眞志保'
						},
						{
							type: 'book',
							title: 'アイヌ語文法の基礎',
							link: 'http://www.daigakusyorin.co.jp/book/b12162.html',
							publisher: '大学書林',
							year: '2008',
							author: '佐藤知己'
						},
						{
							type: 'book',
							title: 'アイヌ語広文典',
							link: 'https://www.hakusuisha.co.jp/book/b649849.html',
							publisher: '白水社',
							year: '2024',
							author: '中川裕'
						}
					],
					en: [
						{
							type: 'book',
							title: 'Ainu Language Grammar Guide',
							link: 'https://www.aynuitak.org/',
							author: 'Silja Ijas',
							year: '2023'
						}
					]
				}
			)}
		</main>
	</section>

	<section id="resource">
		<h2>
			<AkarIconsBookOpen class="h-12 w-12" />
			{$t('Itaksay')}
		</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">資料</span>
			<span lang="en">Resources</span>
			<span lang="ru">Ресурсы</span>
		</div>
		<main>
			<ul>
				<li lang="ja">
					公益財団法人 アイヌ民族文化財団「<a
						href="https://www.ff-ainu.or.jp/web/potal_site/"
						lang="ja"
						target="_blank">アイヌ語ポータルサイト</a
					>」
				</li>
				<li lang="ja">
					佐藤 知己，モコットゥナシ 北原，シリヤ イヤス（2022）「<a
						href="https://doi.org/10.14943/Jais.2.075"
						target="_blank"
						>「北海道大学キャンパスガイドマップ」のアイヌ語併記作業について：翻訳と脱植民地化に関する議論をめぐって</a
					>」『アイヌ・先住民研究』北海道大学アイヌ・先住民研究センター
				</li>
				<li lang="en">
					<CitationEN
						author="Ijas, Silja"
						year="2023"
						title="Language revitalization through lexical modernization and neologism-coining: The current state and future tasks of modernizing Ainu lexicon"
						link="https://doi.org/10.14943/Jais.3.117"
						journal="Aynu Teetawanoankur Kanpinuye"
						volume="3"
						pages="117-160"
					/>
				</li>
			</ul>
		</main>
	</section>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	@media screen and (max-width: 768px) {
		.title-content :global(.ayus) {
			display: none;
		}
	}

	.script-select-container {
		display: flex;
		align-items: center;
		justify-content: right;
		width: 100%;

		position: absolute;
		top: 0;
		right: 1em;
		padding: 1.5em;
	}

	div[role='doc-subtitle'],
	.translation {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		font-weight: normal;
		text-align: center;
	}

	section main {
		@apply py-6;
	}

	section h2 {
		@apply flex flex-col items-center justify-center gap-2;
	}

	h1 + div[role='doc-subtitle'] {
		font-size: 1.5em;
		line-height: 2em;
		flex-direction: column;
	}

	h2 + div[role='doc-subtitle'] {
		font-size: 1.35em;
		line-height: 1.5em;
		@apply flex flex-row items-center justify-center gap-4;
	}

	h3 + div[role='doc-subtitle']:not(.card-description) {
		font-size: 1.125em;
		line-height: 1.5em;
		@apply flex flex-row items-center justify-center gap-4;
	}

	p {
		text-align: center;
	}

	.cards {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 2em;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 25em;
		padding: 1em 0;
		margin: 1em;
		border-radius: 1em;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
		gap: 0.5em;
	}

	.card a {
		text-decoration: none;
		color: inherit;
	}

	.card:hover a {
		text-decoration: underline;
	}

	.card a:hover {
		text-decoration: underline;
	}

	.card-description {
		font-size: 1.1em;
		font-weight: bold;
		margin: 0;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card-image {
		width: 100%;
		object-fit: fill;
	}

	section {
		min-height: 100dvh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		position: relative;

		@apply py-12;
	}

	section#title {
		background: #142338;
		color: white;
		text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
	}

	.title-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	ul {
		max-width: 40em;
	}

	button.more {
		background: white;
		color: #142338;
		border: none;
		border-radius: 50%;
		width: 1em;
		height: 1em;
		font-size: 5em;
		vertical-align: baseline;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1.25em;
		animation: bounce 1.2s infinite ease-in-out;
		cursor: pointer;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-0.18em);
		}
		100% {
			transform: translateY(0);
		}
	}

	#title {
		position: relative;
	}

	.sns {
		position: absolute;
		right: 2em;
		bottom: 1em;
		font-size: 2em;
	}

	.sns a {
		color: white;
		text-decoration: none;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}

	.sns a:hover {
		color: #e9e9e9;
		text-decoration: underline;
	}

	.sns a:active {
		color: #c9c9c9;
	}
</style>
