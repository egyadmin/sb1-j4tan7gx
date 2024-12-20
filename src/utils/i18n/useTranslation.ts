import { translations } from './translations';

export const useTranslation = () => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations.ar;
    
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    
    return value;
  };

  return { t, language: 'ar' };
};