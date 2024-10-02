export const handleErrors = () => {
    window.addEventListener('unhandledrejection', err => {
        // Open dialog with error
        const errors = document.getElementById("errors");
        const errors_msg = document.getElementById("errors-msg");
        errors.style.display = "flex";
        errors_msg.textContent = err.reason;
      });
    
      // Close dialog with error
      const close_alert_error = document.getElementById("close-alert-error");
      close_alert_error.addEventListener("click", () => {
        const errors = document.getElementById("errors");
        errors.style.display = "none";
      });
}