import { actionAdd, actionRemove } from './FavoritesConstants';


export function addToFavorites(payload) {
    // console.log(payload)
    return {
        type: actionAdd,
        payload
    }
}

export function removeFromFavorites(payload) {
    return {
        type: actionRemove,
        payload
    }
}