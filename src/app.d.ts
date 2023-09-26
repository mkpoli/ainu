/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="@sveltejs/kit" />
/// <reference types="@rollup/plugin-dsv" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '$data/word_freq.tsv' {
	const content: { word: string; freq: number }[];
	export default content;
}
