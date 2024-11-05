<script lang="ts">
	interface Props {
		title: string;
		author: string;
		year: string;
		link: string;
		journal: string;
		volume: string | undefined;
		pages: string | undefined;
	}

	let {
		title,
		author,
		year,
		link,
		journal,
		volume,
		pages
	}: Props = $props();
</script>

{author} ({year}) <a href={link}>{title}</a>. <i>{journal}</i>. {@html volume &&
	`(<b>${volume}</b>)`}. {@html pages && `pp.${pages}`}
