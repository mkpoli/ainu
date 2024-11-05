<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import '../main.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}

<Footer />
