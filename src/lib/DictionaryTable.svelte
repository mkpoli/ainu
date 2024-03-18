<script lang="ts">
	import { t } from '$lib/convert';
</script>

<table>
	<thead>
		<tr>
			<th>{$t('Ieonnekunnep')}</th>
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
				<a href="https://ainu.ninjal.ac.jp/topic/" lang="ja" target="_blank">
					アトピック別 アイヌ語会話辞典</a
				>
			</td>
			<td>
				<span>Sisamitak-Aynuitak</span><br /><span lang="ja">日本語・アイヌ語</span>
			</td>
			<td> 3500 </td>
		</tr>
		<tr>
			<td>
				<a href="https://ainu.ninjal.ac.jp/topic/en/">Topical Dictionary of Conversational Ainu</a>
			</td>
			<td>
				<span>Inkiriskuritak-Aynuitak</span><br /><span lang="en">English-Ainu</span>
			</td>
			<td> 3500 </td>
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
				<a href="https://en.wiktionary.org/wiki/Category:Ainu_language" lang="en" target="_blank">
					English Wiktionary
				</a>
			</td>
			<td>
				<span>Aynuitak-Inkiriskuritak</span><br /><span lang="en">Ainu-English</span>
			</td>
			<td> 600 </td>
		</tr>
		<tr>
			<td>
				<a
					href="https://docs.google.com/spreadsheets/u/2/d/1zV0gl4TWV5fkf2r9i_1P1jmH_p7LOzbhZQgm7mPwDdE/edit?usp=sharing"
					target="_blank"
				>
					<span lang="ja">現代アイヌ語翻訳用語集</span>
					<br />
					<span lang="en">Modern Ainu Translation Glossary</span>
				</a>
			</td>
			<td>
				<span>Aynuitak-Inkiriskuritak-Sisamitak</span>
				<br />
				<span lang="en">Ainu-English-Japanese</span>
				<br />
				<span lang="ja">アイヌ語・英語・日本語</span>
			</td>
			<td> 500 </td>
		</tr></tbody
	>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	th,
	td {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		padding: 0.25em 0.5em;
	}

	th:first-child {
		border-left: 0;
	}

	td:first-child {
		border-left: 0;
	}

	th:last-child {
		border-right: 0;
	}

	td:last-child {
		text-align: right;
		border-right: 0;
	}
</style>
