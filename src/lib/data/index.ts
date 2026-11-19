import { hsk1Words0 } from "./hsk1-words-0";
import { hsk1Words1 } from "./hsk1-words-1";
import { hsk1Words2 } from "./hsk1-words-2";
import { hsk1Words3 } from "./hsk1-words-3";
import { hsk1Words4 } from "./hsk1-words-4";
import { hsk1Words5 } from "./hsk1-words-5";
import { hsk2Words0 } from "./hsk2-words-0";
import { hsk2Words1 } from "./hsk2-words-1";
import { hsk2Words2 } from "./hsk2-words-2";
import { hsk2Words3 } from "./hsk2-words-3";
import { examples0 } from "./examples-0";
import { examples1 } from "./examples-1";
import { examples2 } from "./examples-2";
import { examples3 } from "./examples-3";
import { examples4 } from "./examples-4";

export type Word = { id: string; hanzi: string; pinyin: string; translations: { ru: string } };
export type Example = { id: string; wordId: string; hanzi: string; pinyin: string; translations: { ru: string }; maxLevel: number };

export const hsk1Words = [...hsk1Words0, ...hsk1Words1, ...hsk1Words2, ...hsk1Words3, ...hsk1Words4, ...hsk1Words5];
export const hsk2Words = [...hsk2Words0, ...hsk2Words1, ...hsk2Words2, ...hsk2Words3];

export const hsk1Examples: Example[] = [...examples0, ...examples1, ...examples2, ...examples3, ...examples4];

export function getExamplesForWord(wordId: string) {
  return hsk1Examples.filter(e => e.wordId === wordId);
}
