import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          app_title: "GraphEditor Pro",
          tools: {
            select: "Select",
            rect: "Rectangle",
            circle: "Circle",
          },
          canvas_placeholder: "Canvas Area will be here...",
        },
      },
      uk: {
        translation: {
          app_title: "ГрафРедактор Про",
          tools: {
            select: "Вибрати",
            rect: "Прямокутник",
            circle: "Коло",
          },
          canvas_placeholder: "Тут буде полотно...",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
