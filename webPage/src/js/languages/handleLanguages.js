import dataJson from '../data.json';
import { handleCloseFilters } from '../effects';
import { createQuery } from '../queries/handleQueries';

/**
 * Change all words according to selected language
 * @param {string} lang 
 */
export const handleLanguages = (lang = "en") => {
    handleCloseFilters();
    const data = dataJson.content;

    // Change footer
    const copyright = document.getElementsByClassName("copyright")[0];
    copyright.textContent = data["footer"][lang];
    
    // Change search_by
    const search_by = document.getElementsByClassName("container-filters container-filters__title")[0];
    search_by.innerHTML = data["search_by"][lang];

    // Change Command && Meaning
    const command_and_meaning = document.getElementsByClassName("version-filter")[0];
    command_and_meaning.innerHTML = data["CommandsAndMeaning"][lang];

    // Change Command && Meaning
    const command = document.getElementsByClassName("version-filter")[1];
    command.innerHTML = data["Command"][lang];
    
    // Change Command && Meaning
    const meaning = document.getElementsByClassName("version-filter")[2];
    meaning.innerHTML = data["Meaning"][lang];

    // Change in menu filter categories
    const categories = document.getElementsByClassName("container-filters container-filters__title")[1];
    categories.innerHTML = data["categories"][lang];

    // Change in menu filter all
    const all = document.getElementsByClassName("version-filter")[3];
    all.innerHTML = data["all"][lang];

    // Change in menu filter text_apply
    const text_apply = document.getElementsByClassName("text_apply")[0];
    text_apply.innerHTML = data["btn_apply"][lang];

    // Change in copy clipboard copied
    const copied = document.querySelectorAll(".popover-clipboard");
    copied.forEach(item => {
        item.innerHTML = data["copied"][lang];
    });

    // Change version in footer
    const version = document.getElementsByClassName("version-app")[0];
    version.innerHTML = data["version"][lang];

    // Version 0.0.1_1
    const v_0_0_1_1 = document.getElementById("0.0.1_1");
    v_0_0_1_1.innerHTML = data["0.0.1_1"][lang];

    // Version 0.0.1_2
    const v_0_0_1_2 = document.getElementById("0.0.1_2");
    v_0_0_1_2.innerHTML = data["0.0.1_2"][lang];

    // Version 0.0.2_1
    const v_0_0_2_1 = document.getElementById("0.0.2_1");
    v_0_0_2_1.innerHTML = data["0.0.2_1"][lang];

    // Version 0.0.3_1
    const v_0_0_3_1 = document.getElementById("0.0.3_1");
    v_0_0_3_1.innerHTML = data["0.0.3_1"][lang];

    // Version 0.0.4_1
    const v_0_0_4_1 = document.getElementById("0.0.4_1");
    v_0_0_4_1.innerHTML = data["0.0.4_1"][lang];
}

/**
 * Return language acoording to browser like "/es" or "/en"
 */
export const getDefaultLanguageOfBrowser = () => {
    const langDefaultOfBrowser = navigator.language;
    if(!langDefaultOfBrowser){
        return DEFAULT_LANGUAGE;
    }

    const found = Object.values(LANGS).find(e => e === langDefaultOfBrowser);
    if(!found){
        return DEFAULT_LANGUAGE;
    }
    return langDefaultOfBrowser
}

export const changeLangInQuery = (queryObject, language) => {
    queryObject.lang = language;
    return createQuery(queryObject);

}

export const LANGS = Object.freeze({
    EN: 'en',
    ES: 'es',
});

/**
 * By default is english
 */
export const DEFAULT_LANGUAGE = "en";