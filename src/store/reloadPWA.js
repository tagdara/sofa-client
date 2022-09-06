export const reloadPWA = () => {
        
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
    window.location.reload(true)
} 