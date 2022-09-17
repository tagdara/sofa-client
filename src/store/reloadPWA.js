export const reloadPWA = () => {
    localStorage.removeItem('deviceStateStore');
    localStorage.removeItem('deviceStore')
    localStorage.removeItem('userStore')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
    window.location.reload(true)
}