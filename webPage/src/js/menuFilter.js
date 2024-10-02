import { colorsEnum } from "./utils";

/**
 * It’s used to reset the filter’s content
 */
export const template_Menu_filter = 
`
<div class="filters__btn__container">
<button id="filters__btn__close" class="filters__btn__close">
    <p></p>
    <p></p>
</button>
</div>

<p class="container-filters container-filters__title"></p>

<!-- Toggles -->
<!-- <div class="toggle-container">
<button class="toggle">
    <span class="toggle__slider"></span>
</button>
<p class="version-filter">Command && Meaning</p>
</div> -->
<div class="toggle-container container-filters">
<button id="id-btn-all" class="toggle">
    <span id="id-span-all" class="toggle__slider"></span>
</button>
<p id="all" class="version-filter">All</p>
</div>

<!-- Btn apply -->
<!-- <div class="btn-apply-container">
<button class="btn_apply">
    Apply
</button>
</div> -->
`;

/**
 * Building subCategories only whether the category has
 * subCategories
 * @param {HTMLElement} div 
 * @param {object} category 
 * @param {string} lang 
 * @param {object} queryOfFirstChargePage
 */
export const createSubCategories = (div, category, lang, queryOfFirstChargePage) => {
    const newLang = lang.split("").splice(1).join("");
    category.subCategories?.forEach((element, index, buffer) => {
        const divEmpty = document.createElement("div");
    
        const container_subCategory = document.createElement("div");
    
        const arrow_top = document.createElement("div");
        const arrow_bottom = document.createElement("div");
        const container_arrow = document.createElement("div");
    
        const container_toggle_and_text = document.createElement("div");
        const container_btn = document.createElement("button");
        const container_text_subcategory = document.createElement("p");
        const span_toggle = document.createElement("span");
        
        // Put indexes
        element.index = index;

        div.classList.add("toggle-container-subactegories");
        
        // Add div empty
        div.appendChild(divEmpty);
    
        // Building subCategories
        // 1ª Build arrow
        arrow_top.classList.add("arrow");
        // Last element with arrow, this is a special case!
        if(index === buffer.length -1){
            arrow_bottom.classList.add("arrow-bottom");
            arrow_top.classList.add("arrow-left");
        }
        container_arrow.classList.add("container-arrow");
        container_arrow.appendChild(arrow_top);
        container_arrow.appendChild(arrow_bottom);
    
        // 2º Build subCategory’s text
        container_text_subcategory.classList.add("text-subcategory");
        container_text_subcategory.appendChild(document.createTextNode(element[newLang]));
    
        // 3º Build button as toggle
        container_btn.classList.add("toggle-subcategory");
        container_btn.appendChild(span_toggle);
        container_btn.addEventListener("click", event => handleBtnSubCategory(event, category, index));
        span_toggle.classList.add("toggle__slider-category");
        
        // 4º Build container toggle and subcategory
        container_toggle_and_text.classList.add("contianer-toggle-and-subcategory");
        container_toggle_and_text.appendChild(container_btn);
        container_toggle_and_text.appendChild(container_text_subcategory);
    
        container_subCategory.id = element._id;
        container_subCategory.classList.add("container-subcategory");
        container_subCategory.appendChild(container_arrow);
        container_subCategory.appendChild(container_toggle_and_text);

        // Set subCategory 'All' as actived by default
        if(element._id === "all" && !queryOfFirstChargePage.subcategory){
            container_btn.style.backgroundImage = colorsEnum[element.color];
            span_toggle.classList.add("toggle__slider-category--move-to-right");
            element.active = true;
        }else if(element._id === queryOfFirstChargePage.subcategory){
            container_btn.style.backgroundImage = colorsEnum[element.color];
            span_toggle.classList.add("toggle__slider-category--move-to-right");
            element.active = true;

        }else{
            element.active = false;
        } 
    
        div.appendChild(container_subCategory);
    });
}

const handleBtnSubCategory = (event, category, index) => {
    const {subCategories} = category;
    const filterActived = subCategories.map(i => i.active).findIndex(item => item);

    // 1º case. 
    if(index === filterActived){
        return;
    }else{
        activeOrDesactiveToggles(subCategories, index);
    }
}

/**
 * Handle toggles in subCategories by index
 * @param {index} number
 */
export const activeOrDesactiveToggles = (subCategories, index) => {
    // Get all btns
    const all_togggles = document.querySelectorAll(".toggle-subcategory");
    const circle = document.querySelectorAll(".toggle__slider-category");
    const btn_selected = document.getElementsByClassName("toggle-subcategory")[index];

    // Disable all toggles
    all_togggles.forEach((btn, i) => {
        btn.style.backgroundImage = "";
        circle[i].classList.remove("toggle__slider-category--move-to-right");
        subCategories[i].active = false;
    });

    // Only active btn is clicked
    subCategories[index].active = true;
    btn_selected.style.backgroundImage =  colorsEnum[subCategories[index].color];
    circle[index].classList.add("toggle__slider-category--move-to-right");
}