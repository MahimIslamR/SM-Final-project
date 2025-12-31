import { ADD_TO_CART, DECREASE_QTY, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cartActions';

const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action) => {
    console.log('Cart action:', action.type, action.payload);
    switch (action.type) {
        case ADD_TO_CART: {
            const product = action.payload;
            const existing = state.cart.find(i => i.id == product.id);
            if (existing) {
                return {
                    ...state,
                    cart: state.cart.map(i => i.id == product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
                };
            }
            const newItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: Number(product.price) || product.price,
                categoryName: product.categoryName,
                quantity: 1
            };
            return {
                ...state,
                cart: [...state.cart, newItem]
            };
        }
        case DECREASE_QTY: {
            const id = action.payload;
            const item = state.cart.find(i => i.id == id);
            if (!item) return state;
            if ((item.quantity || 1) <= 1) {
                return {
                    ...state,
                    cart: state.cart.filter(i => i.id != id)
                };
            }
            return {
                ...state,
                cart: state.cart.map(i => i.id == id ? { ...i, quantity: i.quantity - 1 } : i)
            };
        }
        case REMOVE_FROM_CART: {
            const id = action.payload;
            return {
                ...state,
                cart: state.cart.filter(i => i.id != id)
            };
        }
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

export default cartReducer;
