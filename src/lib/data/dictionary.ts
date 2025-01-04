import WORD_FREQ_LIST from '$data/word_freq.tsv';
import EXTRA_WORD_LIST from '$data/already_exists.txt?raw';

export const PERSONAL_AFFIXES = [
	'ku=',
	'k=',
	'a=',
	'ci=',
	'eci=',
	'e=',
	'i=',
	'en=',
	'un=',
	'=an',
	'=as'
];

export const dictionary = [
	...WORD_FREQ_LIST,
	...PERSONAL_AFFIXES.map((word) => ({ word, freq: 9999 })),
	...EXTRA_WORD_LIST.split('\n')
		.filter(
			(word) =>
				word &&
				!PERSONAL_AFFIXES.includes(word) &&
				!WORD_FREQ_LIST.find(({ word: w }) => w === word)
		)
		.map((word) => ({ word, freq: 0 }))
];
