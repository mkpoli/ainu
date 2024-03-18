<script lang="ts">
	import { t } from '$lib/convert';

	type Dictionary = {
		url: string;
		name: string;
		languages: string[];
		count: number;
	};

	const dictionaries: Dictionary[] = [
		{
			url: 'https://ainugo.nam.go.jp/dic',
			name: '国立アイヌ民族博物館アイヌ語アーカイブ',
			languages: ['Aynuitak-Sisamitak', 'アイヌ語・日本語'],
			count: 27000
		},
		{
			url: 'http://hdl.handle.net/2115/87707',
			name: '和愛辞典 : 草稿版 （太田満 編）',
			languages: ['Sisamitak-Aynuitak', '日本語・アイヌ語'],
			count: 12500
		},
		{
			url: 'https://ainu.ninjal.ac.jp/topic/',
			name: 'アトピック別 アイヌ語会話辞典',
			languages: ['Sisamitak-Aynuitak', '日本語・アイヌ語'],
			count: 3500
		},
		{
			url: 'https://ainu.ninjal.ac.jp/topic/en/',
			name: 'Topical Dictionary of Conversational Ainu',
			languages: ['Inkiriskuritak-Aynuitak', 'English-Ainu'],
			count: 3500
		},
		{
			url: 'https://ja.wiktionary.org/wiki/%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA:%E3%82%A2%E3%82%A4%E3%83%8C%E8%AA%9E',
			name: '日本語版Wiktionary',
			languages: ['Aynuitak-Sisamitak', 'アイヌ語・日本語'],
			count: 2000
		},
		{
			url: 'https://itak.aynu.org/',
			name: 'Tane an Aynuitak-kotupte Itak-uwoeroskip\n現代アイヌ語翻訳用語集\nModern Ainu Translation Glossary',
			languages: [
				'Aynuitak-Sisamitak-Inkiriskuritak',
				'アイヌ語・日本語・英語',
				'Ainu-Japanese-English'
			],
			count: 1000
		},
		{
			url: 'https://en.wiktionary.org/wiki/Category:Ainu_language',
			name: 'English Wiktionary',
			languages: ['Aynuitak-Inkiriskuritak', 'Ainu-English'],
			count: 600
		}
	];
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
		{#each dictionaries as { url, name, languages, count }}
			<tr>
				<td>
					<a href={url} lang="ja" target="_blank">{@html name.replaceAll(/\n/g, '<br />')}</a>
				</td>
				<td>
					{#each languages as language, i}
						<span>{i === 0 ? language.split('-').map($t).join('-') : language}</span><br />
					{/each}
				</td>
				<td> {count} </td>
			</tr>
		{/each}
	</tbody>
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
