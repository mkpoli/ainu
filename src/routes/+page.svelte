<script lang="ts">
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
		<h1>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</h1>
		<div role="doc-subtitle">
			<span lang="ja"> アイヌ語執筆支援サイト </span>
			<span lang="en"> Ainu Language Writing Support Site </span>
			<span lang="ru"> Сайт поддержки письма на языке айну </span>
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
		<h2>Aeywankep</h2>
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
					<span lang="ru">Преобразование айну в письменность</span>
				</div>
			</div>
		</div>
	</section>
</main>

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
</style>
