export const reloadPWA = () => {
    localStorage.removeItem('endpointState');
    localStorage.removeItem('discovery')
    localStorage.removeItem('userStore')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
    window.location.reload(true)
}