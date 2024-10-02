import { handleCloseFilters, handleFilters, handleFocusInputSearch } from './effects';
import { closeModal, copyInClipboardModalCommand, copyInClipboardModalMeaning } from './modalCommand';
import { handleErrors } from './handleErrors';
import { handleCloseModalVersionApp, handleModalVersionApp } from './modalVersionApp';
import { componentDidMount, getInitialQueries, goHome, handleButtonsLanguage, handleChangesUrl, handleInputSearch, handleToggleFiletrs } from './app';

/**
 * First function in executing
 */
function init() {
    componentDidMount();
    handleErrors();
    document.addEventListener("DOMContentLoaded", () => {
        goHome();
        getInitialQueries();
        handleButtonsLanguage();
        handleInputSearch();
        handleToggleFiletrs();
        handleChangesUrl();

        // Effects in style
        handleFocusInputSearch();
        handleFilters();
        handleCloseFilters();
        handleCloseModalVersionApp();
        closeModal();
        copyInClipboardModalCommand();
        copyInClipboardModalMeaning();
        handleModalVersionApp();
    });
}

init();
