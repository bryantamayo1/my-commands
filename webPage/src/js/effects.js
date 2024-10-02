// Local variables
// close = false, open = true
let global_open_menu_filters = false;

/**
 * Hnadle input’s focus search
 */
 export const  handleFocusInputSearch = () => {
    const input = document.getElementsByClassName("search__input")[0];
    const search__container = document.getElementsByClassName("search")[0];
    /**
     * It's a flag
     */
    let hasFocus = false;

    // Handle style css
    input.addEventListener("focus", () => {
        search__container.style.boxShadow  = "0px 0px 15px 1px #ce04a2";
        search__container.style.outline = "2px solid #ce04a2";
        hasFocus = true;

        // Other style
        // search__container.style.boxShadow  = "0px 0px 10px 2px rgb(66, 50, 216)";
        // search__container.style.outline = "1px solid blue";
    });
    input.addEventListener("mouseover", () => {
        search__container.style.boxShadow  = "0px 0px 15px 1px #ce04a2";
        search__container.style.outline = "2px solid #ce04a2";
        hasFocus = false;
    });
    input.addEventListener("mouseout", () => {
        if(!hasFocus){
            search__container.style.boxShadow  = "";
            search__container.style.outline = "";
        }
    });
    input.addEventListener("blur", () => {
        search__container.style.boxShadow  = "";
        search__container.style.outline = "";
    });
}

/**
 * Open and close menu filters
 */
export const handleFilters = () => {
    const button_filters = document.getElementsByClassName("search__button search__button--right")[0];
    const filters = document.getElementsByClassName("filters")[0];

    button_filters.addEventListener("click", () => {   
        // If menu is close
        if(global_open_menu_filters === false){
            global_open_menu_filters = true;
            filters.style.display = "block";
        }else{
            closeMenuFilter();
        }
    });
}

export const closeMenuFilter = () => {
    const filters = document.getElementsByClassName("filters")[0];
    global_open_menu_filters = false;

    // Config in 1s according to 1s of animation
    filters.style.animation = "closeMenuFilter 1s ease-in-out";
    setTimeout(() => {
        filters.style.animation = "openMenuFilter 1s ease-in-out";
        filters.style.width = "40%";
        filters.style.display = "none";
    }, 1000);
}

/**
 * Close menu filters
 */
export const handleCloseFilters = () => {
    const filters__btn__close = document.getElementById("filters__btn__close");
    filters__btn__close.addEventListener("click", () => {   
        closeMenuFilter();
    });
    
    // Close menu filter outside himself
    document.addEventListener('click', function(event) {
        const containter_filters = document.getElementsByClassName("filters")[0];
        const search__button__right = document.getElementsByClassName("search__button--right")[0];
        const outsideClickBtnRight = !search__button__right.contains(event.target);
        const outsideClickDOM = !containter_filters.contains(event.target);
        if(outsideClickDOM && containter_filters.style.display === "block" && outsideClickBtnRight){
            closeMenuFilter();
        }
      });
}

export const changeHeightOfTable = () => {
    const main = document.getElementsByTagName("main")[0];
    main.style.minHeight = 'calc( 100vh - 40px - 220px - 1px - 150px)';
}


