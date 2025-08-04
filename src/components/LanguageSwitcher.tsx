import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang); // ✅ make sure this is saved
  };

  return (
    <div className="flex gap-3 text-white">
      <button onClick={() => handleLanguageChange("en")}>EN</button>
      <button onClick={() => handleLanguageChange("de")}>DE</button>
    </div>
  );
};

export default LanguageSwitcher;
