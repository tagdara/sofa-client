import useUserStore from 'user/userStore'

export function isFavorite(endpointId) {
    const favorites = useUserStore.getState().preferences.favorites
    return favorites.includes(endpointId)
}

export function makeFavorite(endpointId) {
    const favorites = useUserStore.getState().preferences.favorites
    const update = useUserStore.getState().update
    if (!favorites.includes(endpointId)) {
        update('favorites', [...favorites, endpointId])
    } else {
        console.log('already fav', endpointId, favorites)
    }
}

export function removeFavorite(endpointId) {

    var favorites = [...useUserStore.getState().preferences.favorites]
    const update = useUserStore.getState().update
    if (favorites.includes(endpointId)) {
        console.log('removing fav', endpointId)
        favorites = favorites.filter(function(item) {
            return item !== endpointId
        })
        update('favorites', favorites)
    } else {
        console.log('was not fav', endpointId, favorites)
    }
}