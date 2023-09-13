<script lang="ts">
	import Ayus from '$assets/Ayus.svelte';
	import Footer from '$lib/Footer.svelte';
	import ScriptSelect from '$lib/ScriptSelect.svelte';
	import { script, t } from '$lib/convert';
	import MaterialSymbolsFitbitArrowDownwardRounded from '~icons/material-symbols/fitbit-arrow-downward-rounded';
</script>

<svelte:head>
	<title>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</title>
</svelte:head>

<main>
	<section id="title">
		<div class="script-select-container">
			<ScriptSelect />
		</div>

		<div class="title-content">
			<Ayus />
			<div>
				<h1>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</h1>
				<div role="doc-subtitle">
					<span lang="ja"> アイヌ語執筆支援サイト </span>
					<span lang="en"> Ainu Language Writing Support Site </span>
					<span lang="ru"> Сайт поддержки письма на айнском языке </span>
				</div>
			</div>
			<Ayus />
		</div>

		<button
			on:click={() => {
				const section = document.querySelector('section:nth-of-type(2)');
				if (section) {
					section.scrollIntoView({ behavior: 'smooth' });
				}
			}}
			class="more"><MaterialSymbolsFitbitArrowDownwardRounded /></button
		>
	</section>
	<section id="aim">
		<h2>Cikosirepap</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">目的</span>
			<span lang="en">Aim</span>
			<span lang="ru">Цель</span>
		</div>
		<p>
			{$t('Aynuitak einuypa eukasuy wa tanesasuysir osiknuka.')}
		</p>
		<div class="translation">
			<span lang="ja">アイヌ語での文章制作を支援し、その現代化を促進する</span>
			<span lang="en">To support the writing in Ainu and to promote the modernization of Ainu</span>
			<span lang="ru"
				>Поддержать письмо на айнском языке и способствовать его современному развитию</span
			>
		</div>
		<class class="cards">
			<div class="card">
				<a href="https://incubator.wikimedia.org/wiki/Wp/ain/Main%20Page"> Wikipenciya a=kar </a>
				<div class="card-description" role="doc-subtitle">
					<span lang="ja">ウィキペディア誕生プロジェクト</span>
					<span lang="en">Wikipedia Incubator Project</span>
					<span lang="ru">Проект Инкубатора Википедии</span>
					<div />
				</div>
			</div></class
		>
	</section>
	<section id="tools">
		<h2>{$t('Aeywankep')}</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">ツール</span>
			<span lang="en">Tools</span>
			<span lang="ru">Инструменты</span>
		</div>
		<div class="cards">
			<div class="card">
				<h3>
					<a href="/convert">{$t('Ainuitak-Itokpa-Inuye Eutasare')}</a>
				</h3>
				<div class="card-description" role="doc-subtitle">
					<span lang="ja">アイヌ語表記変換</span>
					<span lang="en">Ainu Script Conversion</span>
					<span lang="ru">Преобразование айнской письменности</span>
				</div>
			</div>
		</div>
	</section>
	<section id="dicts">
		<h2>{$t('Aynuitak-Eonnekunnep')}</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">アイヌ語辞書</span>
			<span lang="en">Ainu Dictionaries</span>
			<span lang="ru">Айнские словари</span>
		</div>
		<table>
			<thead>
				<tr>
					<th>{$t('Eonnekunnep')}</th>
					<th>{$t('Itak')}</th>
					<th>{$t('Cipiskip')}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<a href="https://ainugo.nam.go.jp/dic" lang="ja" target="_blank">
							国立アイヌ民族博物館アイヌ語アーカイブ
						</a>
					</td>
					<td>
						<span>Aynuitak-Sisamitak</span><br /><span lang="ja">アイヌ語・日本語</span>
					</td>
					<td> 27000 </td>
				</tr>
				<tr>
					<td>
						<a href="http://hdl.handle.net/2115/87707" lang="ja" target="_blank">
							和愛辞典 : 草稿版 （太田満 編）</a
						>
					</td>
					<td>
						<span>Sisamitak-Aynuitak</span><br /><span lang="ja">日本語・アイヌ語</span>
					</td>
					<td> 12500 </td>
				</tr>
				<tr>
					<td>
						<a
							href="https://ja.wiktionary.org/wiki/%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA:%E3%82%A2%E3%82%A4%E3%83%8C%E8%AA%9E"
							lang="ja"
							target="_blank"
						>
							日本語版Wiktionary
						</a>
					</td>
					<td>
						<span>Aynuitak-Sisamitak</span><br /><span>アイヌ語・日本語</span>
					</td>
					<td> 2000 </td>
				</tr>
				<tr>
					<td>
						<a
							href="https://en.wiktionary.org/wiki/Category:Ainu_language"
							lang="en"
							target="_blank"
						>
							English Wiktionary
						</a>
					</td>
					<td>
						<span>Aynuitak-Ingurisitak</span><br /><span lang="en">Ainu-English</span>
					</td>
					<td> 600 </td>
				</tr>
			</tbody>
		</table>

		<ul>
			<li>
				<i>{$t('Ainuitak-Nucaitak-Eonnekunnep tane isam. a=eramuan yakun i=pakasnu yan!')}</i>
			</li>
		</ul>
	</section>
	<section id="resource">
		<h2>Itaksay</h2>
		<div role="doc-subtitle" lang="ja">
			<span lang="ja">資料</span>
			<span lang="en">Resources</span>
			<span lang="ru">Ресурсы</span>
		</div>
		<ul>
			<li>
				公益財団法人 アイヌ民族文化財団「<a
					href="https://www.ff-ainu.or.jp/web/potal_site/"
					lang="ja"
					target="_blank">アイヌ語ポータルサイト</a
				>」
			</li>
			<li>
				佐藤 知己，モコットゥナシ 北原，シリヤ イヤス（2022）「<a
					href="https://doi.org/10.14943/Jais.2.075"
					lang="ja"
					target="_blank"
					>「北海道大学キャンパスガイドマップ」のアイヌ語併記作業について：翻訳と脱植民地化に関する議論をめぐって</a
				>」『アイヌ・先住民研究』北海道大学アイヌ・先住民研究センター
			</li>
		</ul>
	</section>
</main>

<Footer />

<style>
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
		flex-direction: column;
		margin: 0;
		font-weight: normal;
		text-align: center;
	}

	h1 + div[role='doc-subtitle'] {
		font-size: 1.5em;
		line-height: 2em;
	}

	h2 + div[role='doc-subtitle'] {
		font-size: 1.35em;
		line-height: 1.5em;
	}

	h3 + div[role='doc-subtitle'] {
		font-size: 1.125em;
		line-height: 1.5em;
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
		padding: 1em;
		margin: 1em;
		border-radius: 1em;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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

	section {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		position: relative;
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
</style>
