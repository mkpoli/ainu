import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import dsv from '@rollup/plugin-dsv';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), Icons({ compiler: 'svelte' }), dsv()]
});
