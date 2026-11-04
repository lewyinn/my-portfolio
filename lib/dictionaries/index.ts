import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { id } from "./id";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, id };

/** Server-side only: client components get the strings they need as props. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
