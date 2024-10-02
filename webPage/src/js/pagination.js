import { getCommands } from "./app";
import { getQueries } from "./utils";

// Global variables
const global_buffer_pagination = [];
const global_limit_btns = 5;

/**
 * Hnadle pagination according to GET /commands
 * @param {object} data providing of BE
 * @param {boolean} btn_search 
 */
export const handlePagination = (data) => {    
    debugger
    const amount_pages = Math.ceil(data.total / data.limitPage);
    data.amount_pages = amount_pages;

    // Create start actived position
    global_buffer_pagination[0] = { active: true, page: data.page }
    
    // Create limit position
    let aux_rest = data.pages - data.page;
    let limitPage = global_limit_btns;
    if(aux_rest <= global_limit_btns){
        limitPage = aux_rest;
    }

    // Fill pagination's buffer
    for(let i = 2; i <= limitPage; i++){
        global_buffer_pagination.push({ active: false, page: i });
    }

    // Push global_buffer_pagination, because this function is called several times
    // if(!global_buffer_pagination.length){
    //     for(let i = 1; i <= global_limit_btns; i++){
    //         global_buffer_pagination.push({ active: false, page: i });
    //     }

    //     // Special case
    //     // Fill page according this conditions
    //     if(data.page - 1 >= global_limit_btns){
    //         for(let i = global_limit_btns + 1; i <= data.page; i++){
    //             global_buffer_pagination.push({ active: false, page: i });
    //         }
    //     }

    //     // Active btn page
    //     global_buffer_pagination[data.page - 1] = {active: true, page: data.page}
    // }else{
    //     // Check last number in pagination in new search
    //     const page_current = global_buffer_pagination.find(i => i.page === data.page);
    //     if(!page_current){
    //         global_buffer_pagination.forEach((item, index) => item.page = index + 1);
    //     }
    // }
    // console.log("1º global_buffer_pagination: ", global_buffer_pagination);

    createBtnPagination(amount_pages, data);
}

/**
 * Clean and create btns of pagination
 * @param {number} increase
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

    // Create btns in pagination
    const rest = data.page % global_limit_btns;
    let indexStartPagination = 1;
    if(rest){
        indexStartPagination = data.page - rest + 1;
    }else{
        indexStartPagination = data.page - global_limit_btns + 1;
    }
    
    // Move pagination to other 5 btns. Better copy with classic for and not forEach
    global_buffer_pagination.forEach(item => {
        if(increase === 1){
            item.page+=global_limit_btns;
        }else if(increase === -1){
            item.page-=global_limit_btns;
        }
    });

    // Calculate limite of pages inn pagination
    let limit_buffer_pagination = 5;
    let find_limit_n_buffer_pagination = global_buffer_pagination.map(i => i.page).indexOf(data.amount_pages);

    if(find_limit_n_buffer_pagination === -1){
        find_limit_n_buffer_pagination = limit_buffer_pagination;
    }else{
        find_limit_n_buffer_pagination+=1;
    }

    for(let i = 0; i < find_limit_n_buffer_pagination;  i++){
        const pagination_container = document.getElementsByClassName("pagination-container")[0];
        const btn_pagination = document.createElement('button');
        btn_pagination.classList.add("btn-pagination");
        btn_pagination.addEventListener("click", event => handleBtnPagination(event, global_buffer_pagination[i].page) );
        btn_pagination.appendChild( document.createTextNode( global_buffer_pagination[i]?.page ) );
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
    global_buffer_pagination.forEach(item => {
        item.active = false;
        if(item.page === data.page){
            item.active = true;
        }
    });

    // Put btn next
    if(amount_pages > global_buffer_pagination[global_buffer_pagination.length - 1].page){
        const pagination_container = document.getElementsByClassName("pagination-container")[0];
        const btn_pagination = document.createElement('button');
        btn_pagination.classList.add("btn-pagination");
        btn_pagination.addEventListener("click", event => handleNextPagination(event, amount_pages,data, 1));
        btn_pagination.appendChild( document.createTextNode(">") );
        pagination_container.appendChild(btn_pagination);
    }
    
    // Put btn before
    if(global_buffer_pagination[0].page !== 1){
        const pagination_container = document.getElementsByClassName("pagination-container")[0];
        const btn_pagination_first = document.getElementsByClassName("btn-pagination")[0];
        const btn_pagination = document.createElement('button');
        btn_pagination.classList.add("btn-pagination");
        btn_pagination.addEventListener("click", event => handleNextPagination(event, amount_pages, data, -1));
        btn_pagination.appendChild( document.createTextNode("<") );
        pagination_container.insertBefore(btn_pagination, btn_pagination_first);
    }

    // console.log("2º global_buffer_pagination: ", global_buffer_pagination);

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
    debugger
    createBtnPagination(amount_pages, data, index_to_move);
}