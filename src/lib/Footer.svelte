<script lang="ts">
	import { t } from '$lib/convert';
	import MdiGithub from '~icons/mdi/github';
</script>

<footer class="font-Poiret">
	<a href="https://github.com/mkpoli/ainu">
		<MdiGithub />
	</a>
	<a href="https://aynu.org/" class="font-bold italic hover:underline">Aynu.org</a>{$t(
		'© 2023 pa wano kar'
	)}
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 1.5em;
		width: 100%;
		background-color: #124669;
		color: white;
		font-size: 1.5em;
	}

	footer a {
		color: inherit;
		text-decoration: none;
	}
</style>
