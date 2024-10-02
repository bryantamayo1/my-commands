import { getDefaultLanguageOfBrowser } from "../languages/handleLanguages";

/**
 * Create a query like:
 *  "page=1&lang=en&category=all"
 * @param {object} query like {page: 1, lang: "en"}
 * @return {string} string like "page=1&lang=en&category=all"
 */
export const createQuery = (query = {}) => {
    const url = new URLSearchParams(query);
    return url.toString();
}

export const defaultQuery = {
    page: 1,
    lang: getDefaultLanguageOfBrowser(),
    category: "all"
}
