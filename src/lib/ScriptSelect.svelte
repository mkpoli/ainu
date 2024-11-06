<script lang="ts">
	import { script, t } from '$lib/convert';
	import TablerLanguageKatakana from '~icons/tabler/language-katakana';
</script>

<div class="flex items-center justify-end gap-4">
	<label class="flex items-center justify-right gap-2" for="script-select">
		<TablerLanguageKatakana />
		{$t('Itokpa-Inuye')}</label
	>
	<select
		id="script-select"
		name="script"
		bind:value={$script}
		class="bg-white text-slate-950 text-sm px-2 w-48 leading-tight rounded-md"
	>
		<option value="Latn">Rómaunkur-Itakitokpa</option>
		<option value="Kana">カタカナ イタキトㇰパ</option>
		<option value="Cyrl">Нуча-итакитокпа</option>
	</select>
</div>
