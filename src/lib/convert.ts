/**
 * This is a TypeScript port of the original Lua (Scribunto) module by User:Mkpoli (same individual as this projects' author) and User:BrassSnail , with modifications to comply the common Ainu kanaization conventions.
 * https://ja.wiktionary.org/w/index.php?title=%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB:ain-kana-conv&oldid=1814571
 */

const AINU_LATN_WORD_PATTERN = /([a-zA-Z\p'\-=∅ø]+)/;

const CONSONANTS: string[] = [
  "p", "t", "c", "k",
  "m", "n", "s", "h",
  "w", "r", "y", "'"
];

const VOWELS: string[] = [
  "a", "i", "u", "e", "o",
  "á", "í", "ú", "é", "ó",
];

const ACCENT_CONVERSION_TABLE: Record<string, string> = {
  "á": "a", "í": "i", "ú": "u", "é": "e", "ó": "o",
};


const CONVERSION_TABLE: Record<string, string> = {
  "a": "ア", "i": "イ", "u": "ウ", "e": "エ", "o": "オ",
  "'a": "ア", "'i": "イ", "'u": "ウ", "'e": "エ", "'o": "オ",
  "ka": "カ", "ki": "キ", "ku": "ク", "ke": "ケ", "ko": "コ",
  "sa": "サ", "si": "シ", "su": "ス", "se": "セ", "so": "ソ",
  "ta": "タ", "tu": "ト゚", "te": "テ", "to": "ト",
  "ca": "チャ", "ci": "チ", "cu": "チュ", "ce": "チェ", "co": "チョ",
  "CA": "サ゚", "CU": "ス゚", "CE": "セ゚", "CO": "ソ゚",
  "na": "ナ", "ni": "ニ", "nu": "ヌ", "ne": "ネ", "no": "ノ",
  "ha": "ハ", "hi": "ヒ", "hu": "フ", "he": "ヘ", "ho": "ホ",
  "pa": "パ", "pi": "ピ", "pu": "プ", "pe": "ペ", "po": "ポ",
  "ma": "マ", "mi": "ミ", "mu": "ム", "me": "メ", "mo": "モ",
  "ya": "ヤ", "yi": "イ", "yu": "ユ", "ye": "イェ", "yo": "ヨ",
  "ra": "ラ", "ri": "リ", "ru": "ル", "re": "レ", "ro": "ロ",
  "wa": "ワ", "wi": "ヰ", "we": "ヱ", "wo": "ヲ",
  "nn": "ン", "tt": "ッ"
};

const CODA_CONS: Record<string, string> = {
  "w": "ゥ", "y": "ィ",
  "m": "ㇺ", "n": "ㇴ", "N": "𛅧",
  "s": "ㇱ", "S": "ㇲ",
  "p": "ㇷ゚", "t": "ッ", "T": "ㇳ", "k": "ㇰ"
};
// const CODA_VARA: Record<string, Record<string, string>> = {
//   "r": {
//     "a": "ㇻ", "i": "ㇼ", "u": "ㇽ", "e": "ㇾ", "o": "ㇿ"
//   },
//   "h": {
//     "a": "ㇵ", "i": "ㇶ", "u": "ㇷ", "e": "ㇸ", "o": "ㇹ"
//   },
//   "x": {
//     "a": "ㇵ", "i": "ㇶ", "u": "ㇷ", "e": "ㇸ", "o": "ㇹ"
//   }
// };

const CODA_VARA: Record<string, Record<string, string>> = {
  "r": {
    "a": "ㇻ", "i": "ㇼ", "u": "ㇽ", "e": "ㇾ", "o": "ㇿ"
  },
  "h": {
    "a": "ㇵ", "i": "ㇶ", "u": "ㇷ", "e": "ㇸ", "o": "ㇹ"
  },
  "x": {
    "a": "ㇵ", "i": "ㇶ", "u": "ㇷ", "e": "ㇸ", "o": "ㇹ"
  }
};

const VARIANT_TABLE: Record<string, string[]> = {
  // "ト゚": ["ツ゚", "トゥ"],
  "ㇴ": ["ン"],
  "ヱ": ["ウェ"],
  "ヰ": ["ウィ"],
  "ヲ": ["ウォ"],
  "ㇷ゚パ": ["ッパ"],
  "ㇷ゚ピ": ["ッピ"],
  "ㇷ゚ペ": ["ッペ"],
  "ㇷ゚プ": ["ップ"],
  "ㇷ゚ポ": ["ッポ"],
  "ㇰカ": ["ッカ"],
  "ㇰキ": ["ッキ"],
  "ㇰケ": ["ッケ"],
  "ㇰク": ["ック"],
  "ㇰコ": ["ッコ"],
  "ィ": ["イ"],
  "ゥ": ["ウ"],
  "ㇻ": ["ㇽ"],
  "ㇼ": ["ㇽ"],
  "ㇾ": ["ㇽ"],
  "ㇿ": ["ㇽ"],
};


// function convertLatn2Kana(latn: string) {}

type StringMap = { [key: string]: string | undefined };

const inKeys = (key: string, obj: StringMap): boolean => Object.prototype.hasOwnProperty.call(obj, key);

function convertSyllable(syllable: string, nextChar?: string): string {
  if (syllable.length === 0) {
    return "";
  }

  let remains = syllable;
  let coda = "";

  const lastChar = syllable[syllable.length - 1];

  // console.log(lastChar);

  if (lastChar in CODA_CONS) {
    // Ends with a coda consonant with no variants
    remains = remains.slice(0, -1);
    coda = CODA_CONS[lastChar];
    if (lastChar === "n" && nextChar) {
      coda = CONVERSION_TABLE['nn']!;
    }
  } else if (lastChar in CODA_VARA) {
    remains = remains.slice(0, -1);
    const secondLastChar = syllable[syllable.length - 2];
    coda = CODA_VARA[lastChar][secondLastChar];
  }

  // console.log(`remains = "${remains}", coda = "${coda}"`);

  let accentedFlag = false;
  const nucleus = remains[remains.length - 1];

  if (inKeys(nucleus, ACCENT_CONVERSION_TABLE)) {
    accentedFlag = true;
    remains = remains.slice(0, -1) + ACCENT_CONVERSION_TABLE[nucleus];
  }

  if (inKeys(remains, CONVERSION_TABLE)) {
    remains = CONVERSION_TABLE[remains]!;
  } else if (inKeys(remains.toLowerCase(), CONVERSION_TABLE)) {
    remains = CONVERSION_TABLE[remains.toLowerCase()]!;
  } else {
    throw new Error(`cannot find katakana for CV pair: ‘${remains}’`);
  }

  let converted = remains + coda;

  if (accentedFlag) {
    converted = `<u style='text-decoration:overline;'>${converted}</u>`;
  }
  return converted;
}

const applyVariants = (result: string, variantKeys: string[], index: number): string[] => {
  if (index > variantKeys.length) {
    return [result];
  }

  const original = variantKeys[index];
  const variations = VARIANT_TABLE[original]!;
  const allResults = [result, ...variations.map(variation => result.replace(original, variation))];

  let finalResults: string[] = [];
  allResults.forEach(res => {
    finalResults = [...finalResults, ...applyVariants(res, variantKeys, index + 1)];
  });

  return finalResults;
}

// const generateVariants = (target: string): string[] => {
//   const variantKeys = Object.keys(VARIANT_TABLE).filter(original => target.includes(original));
//   return applyVariants(target, variantKeys, 0);
// }

function convertWord(temp: string): string {
  const ignoreChars = "\-=.";
  const validPattern = `[a-zA-Z\p'${ignoreChars}∅ø]+`;
  // Check for non-valid patterns and return the original value if matched
  if (!temp.match(validPattern)) {
    return temp;
  }

  // Normalize by removing the specified ignoreChars
  temp = temp.replace(new RegExp(`[${ignoreChars}]`, "g"), "");

  let groupIds: { [key: number]: number } = {};
  let syllableCount = 1;
  let i = 1;

  for (let char of Array.from(temp)) {
    if (VOWELS.includes(char)) {
      const charBefore = temp.charAt(i - 2); // TypeScript uses zero-based indexing, hence the -2

      if (CONSONANTS.includes(charBefore) || CONSONANTS.includes(charBefore.toLowerCase())) {
        groupIds[i - 1] = syllableCount;
      }
      groupIds[i] = syllableCount;
      syllableCount++;
    }
    i++;
  }

  let strBuffer = "";

  for (let j = 1; j <= temp.length; j++) {
    strBuffer += groupIds[j] ? groupIds[j].toString() : "X";
  }

  // Fill codas
  i = 1;

  for (let char of Array.from(temp)) {
    if (!groupIds[i]) {
      groupIds[i] = groupIds[i - 1];
    }
    i++;
  }

  let result = "";
  let currentGroupId = 1;
  let head = 1;
  let tail = 1;
  let content = "";

  for (let j = 1; j <= temp.length; j++) {
    if (groupIds[j] !== currentGroupId) {
      currentGroupId = groupIds[j];
      tail = j - 1;
      content = temp.substring(head - 1, tail);
      result += convertSyllable(content, temp.charAt(j - 1)); // Using charAt for getting character at specific position
      head = j;
    }
  }

  content = temp.substring(head - 1);
  result += convertSyllable(content);

  // Posprocess

  for (const [variant, replacement] of Object.entries(VARIANT_TABLE)) {
    result = result.replace(variant, replacement[0]);
  }

  return result;
};

export function convertLatn2Kana(latn: string): string {
  const words = latn.toLowerCase().split(AINU_LATN_WORD_PATTERN).filter(Boolean);
  const convertedWords = words.map(word => word.match(AINU_LATN_WORD_PATTERN) ? convertWord(word) : word);
  return convertedWords.join(" ");
}

// export const convert = (frame: any): string => {
//   //... (The content remains largely similar, with syntax changes where needed.)
// }

// export const noVariants = (frame: any): string => {
//   //... (The content remains largely similar, with syntax changes where needed.)
// }

// console.log(doConvert('akan'));

import { writable, derived } from "svelte/store";

export const script = writable<'Latn' | 'Kana' | 'Cyrl'>('Latn');
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
    return (text: string): string => text;
  }
  throw new Error('Unknown script');
});