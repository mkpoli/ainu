<script lang="ts">
	import ScriptSelect from '$lib/ScriptSelect.svelte';
	import { script, t } from '$lib/convert';
	import MaterialSymbolsFitbitArrowDownwardRounded from '~icons/material-symbols/fitbit-arrow-downward-rounded';
	import MdiGithub from '~icons/mdi/github';
</script>

<svelte:head>
	<title>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</title>
</svelte:head>

<main>
	<section id="title">
		<div class="script-select-container">
			<ScriptSelect />
		</div>
		<h1>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</h1>
		<div role="doc-subtitle">
			<span lang="ja"> アイヌ語執筆支援サイト </span>
			<span lang="en"> Ainu Language Writing Support Site </span>
			<span lang="ru"> Сайт поддержки письма на айнском языке </span>
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
	<section>
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
	<section>
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
						<a href="https://ainugo.nam.go.jp/dic" lang="ja">
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
						<a href="http://hdl.handle.net/2115/87707" lang="ja">
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
						<a href="https://en.wiktionary.org/wiki/Category:Ainu_language" lang="en">
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
</main>

<footer>
	<a href="https://github.com/mkpoli/ainu">
		<MdiGithub />
	</a>
	<a href="https://mkpo.li/"><i>mkpoli</i></a>{$t('2023 pa wano kar')}
</footer>

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

	div[role='doc-subtitle'] {
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
		text-shadow: 0 0 1.5em rgba(255, 255, 255, 0.25);
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

	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 1.5em;
		width: 100%;
		background-color: #124669;
		color: white;
		font-size: 1.5em;
	}

	footer a {
		color: inherit;
		text-decoration: none;
	}
</style>
