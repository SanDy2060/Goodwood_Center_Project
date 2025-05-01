// src/utils/translate.js
import axios from "axios";

export const translateText = async (text, targetLang = "es") => {
  try {
    const res = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation failed";
  }
};
