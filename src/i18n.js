
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-xhr-backend";

i18n
  .use(backend)
  // passes i18n down to react-i18next
  .use(initReactI18next)
  .init({
    backend: { loadPath: "data/i18n-{{lng}}.json" },
    lng: "en",
    // ... other configs
  });
