import { LANGUAGES } from "../../constants/languages";

export function desiredLanguagesOrder(locales: string[]): string[] {
  if (!locales) return [];
  const desiredOrder = Object.keys(LANGUAGES);
  const extraLocales = locales.filter((l) => !desiredOrder.includes(l));
  const desiredOrderFiltered = desiredOrder.filter((l) => locales.includes(l));
  return [...desiredOrderFiltered, ...extraLocales];
}
