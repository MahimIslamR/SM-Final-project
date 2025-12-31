import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

function loadState() {
	try {
		const raw = localStorage.getItem('cart');
		if (!raw) return undefined;
		const cartArray = JSON.parse(raw);
		return { cart: { cart: cartArray } };
	} catch (e) {
		return undefined;
	}
}

const preloadedState = loadState();

const store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
	try {
		const state = store.getState();
		const cartArray = state.cart.cart || [];
		localStorage.setItem('cart', JSON.stringify(cartArray));
	} catch (e) {
		// ignore
	}
});

export default store;
