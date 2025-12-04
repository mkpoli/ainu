<script lang="ts">
	import '@fontsource/poiret-one';
	import '@fontsource-variable/el-messiri';
	import '@fontsource/sawarabi-mincho';
	import '@fontsource/hina-mincho';

	import './layout.css';

	import Footer from '$lib/Footer.svelte';

	let { children } = $props();
</script>

{@render children()}

<Footer />
