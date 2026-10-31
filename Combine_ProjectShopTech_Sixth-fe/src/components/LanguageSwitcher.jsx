import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'jp', name: '日本語', flag: '🇯🇵' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-300"
      >
        <span className="text-xl group-hover:scale-110 transition-transform duration-200">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 group-hover:font-semibold hidden sm:block transition-all duration-200">
          {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[40]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`group w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${
                  currentLanguage.code === lang.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{lang.flag}</span>
                <span className="text-sm font-medium group-hover:font-semibold transition-all duration-200">{lang.name}</span>
                {currentLanguage.code === lang.code && (
                  <svg
                    className="w-4 h-4 ml-auto text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
