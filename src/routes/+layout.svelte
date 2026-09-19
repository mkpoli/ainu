<script lang="ts">
	import { page } from '$app/state';

	import '@fontsource/poiret-one';
	import '@fontsource-variable/el-messiri';
	import '@fontsource/sawarabi-mincho';
	import '@fontsource/hina-mincho';

	import './layout.css';

	import Footer from '$lib/Footer.svelte';

	let { children } = $props();

	const description =
		'アイヌ語の作文・翻訳を助ける執筆支援サイト。辞書照合、接辞チェック、ローマ字⇄カタカナ変換、入力候補を備えています。Aynuitak-nuye Ukosamaani Sait: writing and translation support for the Ainu language.';

	let canonical = $derived('https://site.aynu.org' + page.url.pathname);
</script>

<svelte:head>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content="Aynuitak-nuye Ukosamaani Sait｜アイヌ語作文・翻訳支援サイト" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
</svelte:head>

{@render children()}

<Footer />
