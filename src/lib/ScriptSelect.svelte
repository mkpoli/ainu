<script lang="ts">
	import { script, t } from '$lib/convert';
	import TablerLanguageKatakana from '~icons/tabler/language-katakana';
</script>

<div class="script-select">
	<label for="script-select">
		<TablerLanguageKatakana />
		{$t('Itokpa-Inuye')}</label
	>
	<select id="script-select" name="script" bind:value={$script}>
		<option value="Latn">rómaunkur-itakitokpa</option>
		<option value="Kana">カタカナ イタキトㇰパ</option>
		<option value="Cyrl" disabled>Нуча-итакитокпа</option>
	</select>
</div>

<style>
	.script-select {
		display: flex;
		align-items: center;
		justify-content: right;
		gap: 1em;
	}

	label {
		display: flex;
		align-items: center;
		justify-content: right;
		gap: 0.5em;
	}

	select {
		padding: 0.5em;
		line-height: 1.5em;
	}
</style>
