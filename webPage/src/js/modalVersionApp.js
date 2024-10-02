/**
 * Handle modal of version: open and close
 */
export const handleModalVersionApp = () => {
    openVersionApp();
    closeModalVersionApp();
}

/**
 * Open Modal
 */
const openVersionApp = () => {
    const version_app = document.getElementsByClassName("version-app")[0];
    const overlay = document.getElementsByClassName("modal-version")[0];
    version_app.addEventListener("click", () => {
        // Show modal
        overlay.style.display = "flex";
    });
}

/**
 * Close Modal
 */
const closeModalVersionApp = () => {
    const btn = document.getElementsByClassName("modal-version__btn-close")[0];
    btn.addEventListener("click", () => {   
        changeDisplayModalVersion();
    });
}

/**
 * Close Modal outside himself
 */
export const handleCloseModalVersionApp = () => {
    // Close Modal outside himself
    document.addEventListener('click', function({ target }){
        const modal_version = document.getElementsByClassName("modal-version")[0];
        const modal_version__container = document.getElementsByClassName("modal-version__container")[0];
        const version_app = document.getElementsByClassName("version-app")[0];
        if(!modal_version__container.contains(target) && modal_version.style.display === "flex" && 
        !version_app.contains(target)){
            changeDisplayModalVersion();
        }
    });
}


const changeDisplayModalVersion = () => {
    const overlay = document.getElementsByClassName("modal-version")[0];
    // Hide modal
    overlay.style.display = "none";
}