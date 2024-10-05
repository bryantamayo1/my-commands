import { getQueries } from '@js/queries/handleQueries';
import { changeLangInQuery }      from '@js/languages/handleLanguages';
import { LANGS } from '@js/languages/handleLanguages';


/**
 * Hnadler of all endpoints
 * @param {string} endpoint e.g. '/filters'
 * @returns Promise
 */
const Api = async (endpoint = "", query = "") => {
    const data = await fetch(process.env.API_URL + endpoint + query);
    if(data.ok){
        return data.json();
    }else{
        const resp = await data.json(); 
        throw resp.message;
    }
}
/**
 * Endpoints
 */
export class Services{
    /**
     * Get commands and change query in url of host
     * @param {string} lang is always '/es' or '/en'
     * @param {number} page 
     * @param {string} category 
     * @param {string} commandAndMeaning 
     * @param {boolean} fromQueryUrl avoid update url, false = update, true = not update
     * @param {boolean} defaultSearch search with page = 1, lang = "en" and category = "all"
     * @returns Promise
     */
    static async getCommands(lang = "/en", page = 1, categoryAndSubCategoryToSearch = {category: "all"}, commandAndMeaning, fromQueryUrl, defaultSearch, firstSearch){
        const subCategory = categoryAndSubCategoryToSearch.subCategory;
        // Validations
        if(+page < 1){
            page = ""+1;
            // Update url to particular case
            let newurl = window.location.protocol + "//" + window.location.host +
            `?page=${page}&lang=${lang.slice(1, lang.length)}&category=${categoryAndSubCategoryToSearch.category}`;
            if(subCategory) newurl += "&subcategory=" + categoryAndSubCategoryToSearch.subCategory;
            window.history.replaceState({path:newurl},'',newurl);

            const es = document.getElementById("es");
            const en = document.getElementById("en");
    
            const queryObject = getQueries(window.location.search);
    
            es.setAttribute("href", "/?" + changeLangInQuery(queryObject, LANGS.ES));
            en.setAttribute("href", "/?" + changeLangInQuery(queryObject, LANGS.EN));
    
        }
        /**
         * url to search in BE
         */
        let urlToSearch = "";
        
        // Unique case, only it’s executed when the web page is loaded the first time
        if(firstSearch){
            let newurl = window.location.protocol + "//" + window.location.host +
            `?page=${page}&lang=${lang.slice(1, lang.length)}&category=${categoryAndSubCategoryToSearch.category}`;
            if(subCategory) newurl += "&subcategory=" + categoryAndSubCategoryToSearch.subCategory;
            window.history.replaceState({path:newurl},'',newurl);


        // Update query in window.history
        }else if (history.pushState && !fromQueryUrl && !defaultSearch) {
            let newurl = window.location.protocol + "//" + window.location.host +
            `?page=${page}&lang=${lang.slice(1, lang.length)}&category=${categoryAndSubCategoryToSearch.category}${commandAndMeaning}`;
            if(subCategory) newurl += "&subcategory=" + categoryAndSubCategoryToSearch.subCategory;
            window.history.pushState({path:newurl},'',newurl);
        }

        // Create query
        let query = "";
        if(commandAndMeaning){
            query = commandAndMeaning;
        }

        if(history.pushState && defaultSearch){
            let newurl = window.location.protocol + "//" + window.location.host +
            `?page=${page}&lang=${lang.slice(1, lang.length)}&category=${categoryAndSubCategoryToSearch.category}`;
            if(subCategory) newurl += "&subcategory=" + categoryAndSubCategoryToSearch.subCategory;
            window.history.pushState({path:newurl},'',newurl);
            query = "";
        }


        const es = document.getElementById("es");
        const en = document.getElementById("en");

        const queryObject = getQueries(window.location.search);

        es.setAttribute("href", "/?" + changeLangInQuery(queryObject, LANGS.ES));
        en.setAttribute("href", "/?" + changeLangInQuery(queryObject, LANGS.EN));

        urlToSearch = `/commands${lang}?page=${page}&category=${categoryAndSubCategoryToSearch.category}${query}`;
        // This case is parsed only in FE, not in BE
        if(subCategory && subCategory !== "all") urlToSearch += "&subcategory=" + categoryAndSubCategoryToSearch.subCategory;
        return Api(urlToSearch);
    }

    /**
     * Get all filters
     */
    static getFilters(lang = "/en"){
        return Api("/filters"+lang);
    }

    /**
     * Update counter of web page's view
     */
    static getInfoWebPage(){
        return Api("/infopage");
    }
}