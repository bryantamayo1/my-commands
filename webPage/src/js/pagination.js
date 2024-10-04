import { getCommands } from "./app";
import { getQueries } from "./utils";

// Global variables
let globalBufferPagination = [];
/**
 * It's depends on data.pages
 */
let  globalLimitBtns = 5;
let limitLeft = 0, limitRight = 0;

/**
 * Hnadle pagination according to GET /commands
 * @param {object} data providing of BE
 * @param {boolean} firstSearch 
 */
export const handlePagination = (data, firstSearch) => {    
    // Validation
    if(data.pages < globalLimitBtns) globalLimitBtns =  data.pages;

    // Fill pagination's buffer according to limits
    if(firstSearch){
        if(data.page <= globalLimitBtns){
            limitLeft = 1;
        }else{
            limitLeft = data.page;
            if(data.pages - data.page < globalLimitBtns){
                limitLeft = data.page - globalLimitBtns + 1;
            }
        } 
        limitRight = data.pages - data.page < globalLimitBtns ?
        limitLeft + (data.pages - data.page) : limitLeft + globalLimitBtns - 1;
        
        if(data.pages - data.page < globalLimitBtns){
            limitRight = data.page;
        }


        globalBufferPagination = [];
        for(let i = limitLeft; i <= limitRight; i++){
            globalBufferPagination.push({ active: false, page: i });
            const indexFound = globalBufferPagination.findIndex(e => e.page === data.page);
            if(indexFound !== -1){
                globalBufferPagination[indexFound].active = true;
            }
     
        }
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
    createBtnPagination(amount_pages, data, index_to_move);
}