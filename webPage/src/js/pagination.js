import { getCommands } from "./app";
import { getQueries } from "./utils";

// Global variables
let globalBufferPagination = [];
const infoCurrentPagination = {
    actionMove: false,
    bufferPagination: []
}
const limitOfBtns = 5;
/**
 * It's depends on data.pages
 */
let  globalLimitBtns = limitOfBtns;
let limitLeft = 0, limitRight = 0;

/**
 * Hnadle pagination according to GET /commands
 * @param {object} data providing of BE
 */
export const handlePagination = (data) => {    
    // Calculate globalLimitBtns, at that moment is 5 or less
    globalLimitBtns = limitOfBtns;
    if(data.pages < globalLimitBtns) globalLimitBtns =  data.pages;

    if(!infoCurrentPagination.actionMove){
        // Calculate the limits
        if(data.page <= globalLimitBtns){
            limitLeft = 1;
            limitRight = globalLimitBtns;
        }else{
            limitLeft = data.page;
            limitRight = limitLeft + globalLimitBtns - 1; 
            // Last pages
            if(data.pages - data.page  + 1 < globalLimitBtns){
                limitLeft = data.page - globalLimitBtns + 1;
                limitRight = data.page;
            }
        } 
    
        // Fill pagination's buffer according to limits
        globalBufferPagination = [];
        for(let i = limitLeft; i <= limitRight; i++){
            globalBufferPagination.push({ active: false, page: i });
            const indexFound = globalBufferPagination.findIndex(e => e.page === data.page);
            if(indexFound !== -1){
                globalBufferPagination[indexFound].active = true;
            }
        }

    }else{
        limitLeft = infoCurrentPagination.bufferPagination[0].page;
        limitRight = infoCurrentPagination.bufferPagination[infoCurrentPagination.bufferPagination.length - 1].page;
    }

    createBtnPagination(data.pages, data);
}

/**
 * Clean and create btns of pagination, only show 
 * @param {number} increase It can be -1 or 1
 */
const createBtnPagination = (amount_pages, data, increase = 0) => {
    // Clean pagination
    document.querySelectorAll(".btn-pagination")
    .forEach(item => item.remove());
    const pagination_container_aux = document.getElementsByClassName("pagination-container")[0];
    if(!data.resultsForPage){
        pagination_container_aux.classList.add("not-visible");
        return;
    }else{
        pagination_container_aux.classList.remove("not-visible");
    }

    // Rotate pages in pagination
    if(increase){
        if(increase === -1){
            globalBufferPagination.pop();
            globalBufferPagination.unshift({
                active: false,
                page: globalBufferPagination[0].page - 1
             })
        }else{
            globalBufferPagination.shift();
            globalBufferPagination.push({
                active: false,
                page: globalBufferPagination[globalBufferPagination.length - 1].page + 1
            })
        }
    }

    // Calculate real index because array of globalBufferPagination has length of 5 or less
    const auxLimitRight = limitRight - limitLeft < globalLimitBtns ?
     limitRight - limitLeft + 1: globalLimitBtns; 
    for(let i = 1; i <= auxLimitRight;  i++){
        const pagination_container = document.getElementsByClassName("pagination-container")[0];
        const btn_pagination = document.createElement('button');
        btn_pagination.classList.add("btn-pagination");
        btn_pagination.addEventListener("click", event => handleBtnPagination(event, globalBufferPagination[i - 1].page) );
        btn_pagination.appendChild( document.createTextNode( globalBufferPagination[i - 1]?.page ) );
        pagination_container.appendChild(btn_pagination);
    }

    // Paint btn active
    // const btn_active = document.getElementsByClassName("btn-pagination")[data.page - 1];
    // btn_active.classList.add("btn-pagination-active");
    const btns_pagination_calcule_active = document.querySelectorAll(".btn-pagination");
    btns_pagination_calcule_active.forEach(item => {
        if(item.innerHTML === ""+data.page){
            item.classList.add("btn-pagination-active");
        }
    });
    globalBufferPagination.forEach(item => {
        item.active = false;
        if(item.page === data.page){
            item.active = true;
        }
    });

    // Put btn next
    if(amount_pages > globalBufferPagination[globalBufferPagination.length - 1].page){
        const pagination_container = document.getElementsByClassName("pagination-container")[0];
        const btn_pagination = document.createElement('button');
        btn_pagination.classList.add("btn-pagination");
        btn_pagination.addEventListener("click", event => handleNextPagination(event, amount_pages,data, 1));
        btn_pagination.appendChild( document.createTextNode(">") );
        pagination_container.appendChild(btn_pagination);
    }
    
    // Put btn before
    if(globalBufferPagination[0].page !== 1){
        const pagination_container = document.getElementsByClassName("pagination-container")[0];
        const btn_pagination_first = document.getElementsByClassName("btn-pagination")[0];
        const btn_pagination = document.createElement('button');
        btn_pagination.classList.add("btn-pagination");
        btn_pagination.addEventListener("click", event => handleNextPagination(event, amount_pages, data, -1));
        btn_pagination.appendChild( document.createTextNode("<") );
        pagination_container.insertBefore(btn_pagination, btn_pagination_first);
    }

    // Create backup of globalBufferPagination
    if(infoCurrentPagination.actionMove) infoCurrentPagination.bufferPagination = structuredClone(globalBufferPagination);
}

/**
 * Handle btns of pagination
 * @param {*} event 
 * @param {number} page
 */
 const handleBtnPagination = (event, indexPage) => {
    const {lang, category, subcategory} = getQueries(window.location.search);
    // Create category and subCategory to search
    const categoryAndSubCategoryToSearch = {category, subCategory: subcategory }
    getCommands("/" + lang, indexPage, categoryAndSubCategoryToSearch);
}

/**
 * Handle btn Next in pagination
 * @param {*} event 
 */
const handleNextPagination = (event, amount_pages, data, index_to_move) => {
    infoCurrentPagination.actionMove = true;
    createBtnPagination(amount_pages, data, index_to_move);
}