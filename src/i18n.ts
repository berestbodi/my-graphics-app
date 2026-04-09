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
          layers: {
            title: "Layers",
            collapse: "Collapse",
            expand: "Expand",
            show: "Show",
            hide: "Hide",
            moveUp: "Move Up",
            moveDown: "Move Down",
            shapeType: {
              rect: "Rectangle",
              circle: "Circle",
            },
          },
          properties: {
            title: "Properties",
            selectShape: "Select a shape",
            parameters: "Parameters",
            color: "Color",
            width: "Width",
            height: "Height",
            radius: "Radius",
            coordinates: "Coordinates",
            collapse: "Collapse",
            expand: "Expand",
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
          layers: {
            title: "Шари",
            collapse: "Згорнути",
            expand: "Розгорнути",
            show: "Показати",
            hide: "Приховати",
            moveUp: "Вгору",
            moveDown: "Вниз",
            shapeType: {
              rect: "Прямокутник",
              circle: "Коло",
            },
          },
          properties: {
            title: "Властивості",
            selectShape: "Виберіть фігуру",
            parameters: "Параметри",
            color: "Колір",
            width: "Ширина",
            height: "Висота",
            radius: "Радіус",
            coordinates: "Координати",
            collapse: "Згорнути",
            expand: "Розгорнути",
          },
          canvas_placeholder: "Тут буде полотно...",
        },
      },
    },
    supportedLngs: ["uk", "en"],
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: {
      bindI18n: "languageChanged",
    },
  });

export default i18n;
