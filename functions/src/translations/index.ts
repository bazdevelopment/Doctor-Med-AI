import { en } from './en';
import { type ITranslation } from './types';

export const translations: Record<string, ITranslation> = {
  en,
};

export const getTranslation = (lang: string): ITranslation => {
  return translations[lang] || translations['en'];
};
