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

/**
 * Parse string query to object with queries
 * @param {string} queryString e.g. ?numero=1&empresa=c&fin=30&pec=1&total=2&estado=3&fecha=fecha&inicio=inicio
 * @returns {Object} object with queries
 */
export const getQueries = (queryString) => {
    const query = new URLSearchParams(queryString);
    const queryAux = {}
    query.forEach(function(value, key) {
        queryAux[key] = value;
    });
    return queryAux;
}