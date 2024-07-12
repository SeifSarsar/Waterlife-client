import React, { useContext, useState } from 'react';
import { Languages } from '../enums/Language';
import Translator from '../shared/translations/Translator';
import Cookies from 'universal-cookie';

export interface LanguageContextType {
  language: Languages;
  setLanguage(language: Languages): void;
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: Languages.English,
  setLanguage: () => {},
});

//For Functional components
export function useLanguage() {
  return useContext(LanguageContext);
}

export const LanguageProvider: React.FC<{ render: any }> = ({
  children,
  render,
}) => {
  const cookies = new Cookies();
  const [currentLanguage, setCurrentLanguage] = useState<Languages>(
    cookies.get('lang') ? cookies.get('lang') : Languages.English
  );

  const setLanguage = (language: Languages) => {
    Translator.setLanguage(language);
    setCurrentLanguage(language);
    cookies.set('lang', language);
    render({});
  };

  const value = {
    language: currentLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
