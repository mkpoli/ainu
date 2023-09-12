<script lang="ts">
	import { script, t } from '$lib/convert';
</script>

<svelte:head>
	<title>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</title>
</svelte:head>
<label for="script-select">{$t('tokpa-inuye')}</label>
<select id="script-select" name="script" bind:value={$script}>
	<option value="Latn">rómaunkur-itakitokpa</option>
	<option value="Kana">カタカナ イタキトㇰパ</option>
	<option value="Cyrl" disabled>Нуча-итакитокпа</option>
</select>

<h1>{$t('Aynuitak Inuypa Ukosammaani Sayto')}</h1>
<div role="doc-subtitle" lang="ja">アイヌ語執筆支援サイト</div>
<div role="doc-subtitle" lang="en">Ainu Language Writing Support Site</div>
<div role="doc-subtitle" lang="ru">Сайт поддержки письма на языке айну</div>

<style>
	select {
		margin: 0 auto;
	}

	h1 {
		font-size: 2em;
		font-weight: bold;
		margin: 0;
		text-align: center;
	}
	div[role='doc-subtitle'] {
		font-size: 1.5em;
		font-weight: bold;
		margin: 0;
		text-align: center;
	}
</style>
