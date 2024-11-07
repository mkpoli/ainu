<script lang="ts">
	import '@fontsource/poiret-one';
	import '@fontsource-variable/el-messiri';
	import '@fontsource/sawarabi-mincho';
	import '@fontsource/hina-mincho';
	import '../app.css';
	import Footer from '$lib/Footer.svelte';
	import '../main.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}

<Footer />
