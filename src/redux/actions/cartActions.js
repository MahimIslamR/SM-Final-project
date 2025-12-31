export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREASE_QTY = 'DECREASE_QTY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
};

export const decreaseQty = (productId) => ({
    type: DECREASE_QTY,
    payload: productId
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const clearCart = () => ({
    type: CLEAR_CART
});
