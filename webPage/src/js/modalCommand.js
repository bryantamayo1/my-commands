import { colorsEnum, getQueries }   from "./utils";
import Prism            from './prism';
import dataJson         from './data.json';
import moment           from 'moment';

/**
 * Open modal with info selected command
 * @param {*} event
 * @param {object} info
 * @param {string} lang
 */
export const openModal = (event, info, lang) => {
    const overlay = document.getElementsByClassName("overlay")[0];
    const pre_modal = document.getElementById("pre-modal");

    const overlay__command = document.getElementById("code-modal");
    const overlay__meaning = document.getElementsByClassName("overlay__meaning")[0];

    const key_1 = document.getElementsByClassName("overlay__extra-info--key-1")[0];
    const value_1 = document.getElementsByClassName("overlay__extra-info--value-1")[0];

    const key_2 = document.getElementsByClassName("overlay__extra-info--key-2")[0];
    const value_2 = document.getElementsByClassName("overlay__extra-info--value-2")[0];
    
    const span = document.createElement("span");
    const sub_categories = document.getElementsByClassName("sub-categories")[0];

    // Reset command and meaning in modal
    overlay__command.innerHTML = "";
    overlay__meaning.innerHTML = "";
    
    // Chage color in character hash #
    if(info[lang].charAt(0) === "#"){
        const span = document.createElement("span");
        span.innerHTML = "# ";
        span.classList.add("hash-in-meaning");   
        overlay__meaning.appendChild(span);
        overlay__meaning.appendChild( document.createTextNode(info[lang].slice(2, info[lang].length)) );
    }else{
        overlay__meaning.appendChild( document.createTextNode(info[lang].slice(2, info[lang].length)) );
    }

    // Show command
    pre_modal.classList.add(`language-${info.language}`);
    overlay__command.classList.add(`language-${info.language}`);
    overlay__command.innerHTML = info.command;
    
    // Show updatedAt
    const info_updatedAt = moment(info.updatedAt || "");
    if(info_updatedAt.isValid()){
        key_1.innerHTML = dataJson.content["updatedAt"][lang];
        value_1.innerHTML = info_updatedAt.format("DD-MM-YYYY");
    }else{
        key_1.innerHTML = dataJson.content["updatedAt"][lang];
        value_1.innerHTML = "--/--/----";
    }

    // Show createdAt
    const info_createdAt = moment(info.createdAt || "");
    if(info_createdAt.isValid()){
        key_2.innerHTML = dataJson.content["createdAt"][lang];
        value_2.innerHTML = info_createdAt.format("DD-MM-YYYY");
    }else{
        key_2.innerHTML = dataJson.content["createdAt"][lang];
        value_2.innerHTML = "--/--/----";
    }

    // Show subCategpries
    if(info.subCategories.length > 0){
        span.appendChild( document.createTextNode(info.subCategories[0][lang] ));
        span.classList.add("list-container__row-2__subCategory");
        span.style.backgroundImage  = colorsEnum[info.subCategories[0].color];
        sub_categories.appendChild(span);
        sub_categories.style.margin = "0 15px";
    }else{
        sub_categories.style.margin = "0";
    }

    // Reset efects with Prism
    Prism.highlightAll();

    // Show modal
    overlay.style.display = "flex";
}

/**
 * Close modal with btn and outside of modal
 * @param {*} event
 */
export const closeModal = (event) => {
    // Close with btn
    const btn_close_modal = document.getElementById("btn-close-modal");
    btn_close_modal.addEventListener("click", () => {
        const overlay = document.getElementsByClassName("overlay")[0];
        const sub_categories = document.getElementsByClassName("sub-categories")[0];
        sub_categories.innerHTML = "";
        overlay.style.display = "none";
    });
    
    // Close outside of modal
    const overlay = document.getElementsByClassName("overlay")[0];
    overlay.addEventListener("click", (event_overlay) => {
        const overlay__modal = document.getElementsByClassName("overlay__modal")[0];
        const sub_categories = document.getElementsByClassName("sub-categories")[0];
        if(!overlay__modal.contains(event_overlay.target)){
            sub_categories.innerHTML = "";
            overlay.style.display = "none";
        }
    });
}

export const copyInClipboardModalCommand = () => {
    const btn_copy = document.getElementsByClassName("container-icon")[0];
    btn_copy.addEventListener("click", () => {
        // Copy in clipboard a command
        navigator.clipboard.writeText(document.getElementsByClassName("overlay__command")[0].innerHTML);
        
        // Get copied in url query
        const lang = getQueries(window.location.search).lang;
        // show popover with copied successfully
        const div = document.createElement("div");
        div.appendChild( document.createTextNode( dataJson.content["copied"][lang] ));
        div.classList.add("popover-clipboard");
        btn_copy.appendChild(div);

        setTimeout(() => {
            div.style.display = "none";
        }, 1000);
    });
}

export const copyInClipboardModalMeaning = () => {
    const btn_copy = document.getElementsByClassName("container-icon")[1];
    btn_copy.addEventListener("click", () => {
        // Copy in clipboard a command
        navigator.clipboard.writeText(document.getElementsByClassName("overlay__meaning")[0].textContent);

        // Get copied in url query
        const lang = getQueries(window.location.search).lang;
        // show popover with copied successfully
        const div = document.createElement("div");
        div.appendChild( document.createTextNode( dataJson.content["copied"][lang] ));
        div.classList.add("popover-clipboard");
        btn_copy.appendChild(div);

        setTimeout(() => {
            div.style.display = "none";
        }, 1000);
        });
}