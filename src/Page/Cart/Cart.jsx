
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decreaseQty, removeFromCart, clearCart } from '../../redux/actions/cartActions';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart || []);
    
    // Debug: log cart state whenever it changes
    React.useEffect(() => {
        console.log('Cart state updated:', cart);
    }, [cart]);

    const handleIncrease = (product) => {
        dispatch(addToCart(product));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQty(id));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const SHIPPING_COST = 10;
    const VAT_RATE = 0.05;

    const subtotal = cart.reduce((s, i) => s + (Number(i.price) || 0) * (i.quantity || 1), 0);
    const vat = subtotal * VAT_RATE;
    const total = subtotal + vat + SHIPPING_COST;

    return (
        <div className='container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 mt-12'>
            <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className='grid grid-cols-1 gap-4'>
                        {cart.map(item => (
                            <div key={item.id} className='flex items-center border-b border-gray-200 py-4'>
                                <img src={item.image} alt={item.name} className='w-24 h-24 object-cover mr-4' />
                                <div className='flex-grow'>
                                    <h2 className='font-bold'>{item.name}</h2>
                                    <p className='text-gray-500'>{item.categoryName}</p>
                                </div>
                                <div className='text-right mr-6'>
                                    <p className='font-bold'>${item.price}</p>
                                    <p className='text-sm text-gray-500'>Qty: {item.quantity || 1}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => handleDecrease(item.id)} className='btn btn-sm'>-</button>
                                    <button onClick={() => handleIncrease(item)} className='btn btn-sm'>+</button>
                                    <button onClick={() => handleRemove(item.id)} className='btn btn-sm btn-ghost'>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-8 border-t border-gray-200 pt-4'>
                        <div className='flex justify-end mb-3'>
                            <div className='w-64'>
                                <div className='flex justify-between text-gray-600 mb-2'>
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-gray-600 mb-2'>
                                    <span>VAT (5%):</span>
                                    <span>${vat.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-gray-600 mb-4'>
                                    <span>Shipping:</span>
                                    <span>${SHIPPING_COST.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-lg font-bold border-t pt-2'>
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 flex items-center justify-between'>
                        <div>
                            <button onClick={handleClear} className='btn btn-outline'>Clear Cart</button>
                        </div>
                        <div>
                            <button className='btn btn-primary'>Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
