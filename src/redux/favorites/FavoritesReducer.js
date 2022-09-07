const initialState = {
    favoritesProducts: []
}

export function favoritesReducer(state = initialState, action) {
    // console.log(state)
    // console.log(action.payload)
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            let productInFavorites = false;
            console.log(state.favoritesProducts)
            const updatedFavoritesProducts = state.favoritesProducts.map(product => {
                 if (product.id === action.payload.productF.id) {
                     productInFavorites = true;
                     return product;
                } else {
                    return product;
                 }
                });

            if (!productInFavorites) {
                return Object.assign({}, state, {
                    favoritesProducts: [
                        ...state.favoritesProducts,
                        {
                            ...action.payload.productF
                        }
                    ]
                })
            } else {
                return Object.assign({}, state, {
                    favoritesProducts: updatedFavoritesProducts
                });
            }
        case 'REMOVE_FROM_FAVORITES':
            const filteredProducts = state.favoritesProducts.filter(product => {
                return product.id !== action.payload.id
            });

            return Object.assign({}, state, {
                favoritesProducts: filteredProducts
            });
        default:
            return state;
    }
}

