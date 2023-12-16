<script lang="ts">
	export let title: string;
	export let author: string;
	export let year: string;
	export let link: string;
	export let journal: string;
	export let volume: string | undefined;
	export let pages: string | undefined;
</script>

{author} ({year}) <a href={link}>{title}</a>. <i>{journal}</i>. {@html volume &&
	`(<b>${volume}</b>)`}. {@html pages && `pp.${pages}`}
