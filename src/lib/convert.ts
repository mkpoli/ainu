import { browser } from '$app/environment';
import {
	convertLatnToCyrl,
	convertLatnToKana,
	convertKanaToLatn,
	convertCyrlToLatn,
	convertKanaToCyrl,
	convertCyrlToKana
} from 'ainconv';

/**
 * This is a TypeScript port of the original Lua (Scribunto) module by User:Mkpoli (same individual as this projects' author) and User:BrassSnail , with modifications to comply the common Ainu kanaization conventions.
 * https://ja.wiktionary.org/w/index.php?title=%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB:ain-kana-conv&oldid=1814571
 */

const AINU_LATN_WORD_PATTERN = /([a-zA-Z\p'\-=∅ø]+)/;

export function convertLatn2Kana(latn: string): string {
	const words = latn.toLowerCase().split(/(\s+)/).filter(Boolean);
	const convertedWords = words.map((word) => {
		if (word.match(/\s+/)) {
			return word;
		}
		if (word.match(AINU_LATN_WORD_PATTERN)) {
			try {
				return convertLatnToKana(word);
			} catch (e) {
				console.error(e);
				return word;
			}
		} else {
			return word;
		}
	});
	return convertedWords.join('');
}
export function convertLatn2Cyrl(latn: string): string {
	const words = latn.toLowerCase().split(/\s+/).filter(Boolean);
	const convertedWords = words.map((word) => {
		if (word.match(AINU_LATN_WORD_PATTERN)) {
			try {
				return convertLatnToCyrl(word);
			} catch (e) {
				console.error(e);
				return word;
			}
		} else {
			return word;
		}
	});
	return convertedWords.join(' ');
}
export function convertKana2Latn(kana: string): string {
	const words = kana.split(/\s+/).filter(Boolean);
	const convertedWords = words.map((word) => {
		try {
			return convertKanaToLatn(word);
		} catch (e) {
			console.error(e);
			return word;
		}
	});
	return convertedWords.join(' ');
}
export function convertCyrl2Latn(cyrl: string): string {
	const words = cyrl.split(/\s+/).filter(Boolean);
	const convertedWords = words.map((word) => {
		try {
			return convertCyrlToLatn(word);
		} catch (e) {
			console.error(e);
			return word;
		}
	});
	return convertedWords.join(' ');
}
export function convertKana2Cyrl(kana: string): string {
	const words = kana.split(/\s+/).filter(Boolean);
	const convertedWords = words.map((word) => {
		try {
			return convertKanaToCyrl(word);
		} catch (e) {
			console.error(e);
			return word;
		}
	});
	return convertedWords.join(' ');
}
export function convertCyrl2Kana(cyrl: string): string {
	const words = cyrl.split(/\s+/).filter(Boolean);
	const convertedWords = words.map((word) => {
		try {
			return convertCyrlToKana(word);
		} catch (e) {
			console.error(e);
			return word;
		}
	});
	return convertedWords.join(' ');
}

import { writable, derived } from 'svelte/store';

export const script = writable<'Latn' | 'Kana' | 'Cyrl'>('Latn');
export const languageCode = derived(script, ($script) => {
	return `ain-${$script}`;
});
languageCode.subscribe((code) => {
	if (browser) {
		document.documentElement.lang = code;
	}
});
export const t = derived(script, ($script) => {
	if ($script === 'Latn') {
		return (text: string): string => text;
	}
	if ($script === 'Kana') {
		return (text: string) => {
			try {
				return convertLatn2Kana(text);
			} catch (e) {
				console.error(e);
				return text;
			}
		};
	}
	if ($script === 'Cyrl') {
		return (text: string) => {
			try {
				return convertLatn2Cyrl(text);
			} catch (e) {
				console.error(e);
				return text;
			}
		};
	}
	throw new Error('Unknown script');
});
