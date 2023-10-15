export type Token = {
	surface: string;
	position: [start: number, end: number];
};

export function tokenize(inputText: string): Token[] {
	const pattern = /\s+|([\p{L}=]+)|(\p{P})/gu;
	const tokens: Token[] = [];
	for (const match of inputText.matchAll(pattern)) {
		if (!match) continue;
		const [surface] = match;
		if (!surface) continue;
		if (surface.match(/^\s+$/)) continue;
		const start = match.index!;
		const end = start + surface.length;
		tokens.push({ surface, position: [start, end] });
	}
	return tokens;
}
