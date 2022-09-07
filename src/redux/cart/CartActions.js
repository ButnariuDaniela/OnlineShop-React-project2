import { actionAdd, actionRemove } from './CartConstants';



export function addToCart(payload) {
    return {
        type: actionAdd,
        payload
    }
}

export function removeFromCart(payload) {
    return {
        type: actionRemove,
        payload
    }
}