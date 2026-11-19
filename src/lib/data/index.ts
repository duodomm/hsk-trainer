import { hsk1Words } from "./hsk1-words";
import { hsk2Words } from "./hsk2-words";
import { examples0 } from "./examples-0";
import { examples1 } from "./examples-1";
import { examples2 } from "./examples-2";
import { examples3 } from "./examples-3";
import { examples4 } from "./examples-4";

export type Word = { id: string; hanzi: string; pinyin: string; translations: { ru: string } };
export type Example = { id: string; wordId: string; hanzi: string; pinyin: string; translations: { ru: string }; maxLevel: number };

export { hsk1Words, hsk2Words };

export const hsk1Examples: Example[] = [...examples0,...examples1,...examples2,...examples3,...examples4];

export function getExamplesForWord(wordId: string) {
  return hsk1Examples.filter(e => e.wordId === wordId);
}
