import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import hi from '@/translations/hi.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  hi: {
    translation: hi,
  },
};

export type Language = keyof typeof resources;
