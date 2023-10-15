import type { Token } from './tokenize';

export type UposToken = {
	lemma: string;
	position: [number, number];
	upos: string;
	xpos: string;
};

export type TokenGroup = {
	tokens: Token[];
	uposTokens: UposToken[];
};

export function groupTokens(tokens: Token[], uposTokens: UposToken[]): TokenGroup[] {
	const grouped: TokenGroup[] = [];
	let uposIndex = 0,
		tokenIndex = 0;

	while (tokenIndex < tokens.length && uposIndex < uposTokens.length) {
		const [uStart, uEnd] = uposTokens[uposIndex].position;
		const group: TokenGroup = {
			tokens: [],
			uposTokens: []
		};

		// Handle n-to-1 and other cases
		while (tokenIndex < tokens.length) {
			const [tStart, tEnd] = tokens[tokenIndex].position;
			if (tEnd < uStart) {
				tokenIndex++; // Skip this token
			} else if (tStart < uEnd && tEnd > uStart) {
				group.tokens.push(tokens[tokenIndex]);
				tokenIndex++;
			} else {
				break; // Move to next UposToken
			}
		}

		// Fill in UposTokens for the group
		while (uposIndex < uposTokens.length) {
			const [uStart, uEnd] = uposTokens[uposIndex].position;
			if (
				group.tokens.length > 0 &&
				uStart >= group.tokens[0].position[0] &&
				uEnd <= group.tokens[group.tokens.length - 1].position[1]
			) {
				group.uposTokens.push(uposTokens[uposIndex]);
				// If a punctuation UPOS token is encountered, break to form a new group
				if (uposTokens[uposIndex].upos === 'PUNCT') {
					uposIndex++;
					break;
				}
			}
			if (uEnd > group.tokens[group.tokens.length - 1].position[1]) {
				break; // Move to next group of tokens
			}
			uposIndex++;
		}

		if (group.tokens.length > 0 && group.uposTokens.length > 0) {
			grouped.push(group);
		}
	}
	return grouped;
}
