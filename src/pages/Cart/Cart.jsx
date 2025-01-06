import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${server_url}/cart`);
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch cart items.');
            }
        };

        fetchCartItems();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (cartItems.length === 0) {
        return <div className="text-center text-gray-500">Your cart is empty.</div>;
    }

    // Calculate the total price of all items in the cart
    const totalCartPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (!isNaN(price) ? price * item.quantity : 0);
    }, 0);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {cartItems.map((item) => {
                    const price = parseFloat(item.price);
                    const totalPrice = price * item.quantity;

                    return (
                        <div key={item.productId} className="flex items-center p-4 border-b border-gray-200">
                            <div className="ml-4 flex-1">
                                <h2 className="text-xl font-semibold">{item.productName}</h2>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">${!isNaN(totalPrice) ? totalPrice.toFixed(2) : 'N/A'}</p>
                            </div>
                        </div>
                    );
                })}
                <div className="p-4 text-right border-t border-gray-200">
                    <p className="text-xl font-bold">Total: ${totalCartPrice.toFixed(2)}</p>
                </div>
                <div className="p-4 text-right">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;