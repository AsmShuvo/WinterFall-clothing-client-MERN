import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${server_url}/cart/${productId}`);
            // Update the cart items state after deletion
            setCartItems(cartItems.filter(item => item.productId !== productId));
        } catch (err) {
            setError('Failed to delete item from cart.');
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }


    // Separate items into pending and recent status
    const pendingItems = cartItems.filter(item => item.status === 'pending');
    const recentStatusItems = cartItems.filter(item => item.status !== 'pending');

    // Calculate the total price of all pending items in the cart
    const totalCartPrice = pendingItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (!isNaN(price) ? price * item.quantity : 0);
    }, 0);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {pendingItems.map((item) => {
                    const price = parseFloat(item.price);
                    const totalPrice = price * item.quantity;

                    return (
                        <div key={item.productId} className="flex items-center p-4 border-b border-gray-200">
                            <div className="ml-4 flex-1">
                                <h2 className="text-xl font-semibold">{item.productName}</h2>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Unit-Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">${!isNaN(totalPrice) ? totalPrice.toFixed(2) : 'N/A'}</p>
                                <p className="text-sm font-bold text-green-700 uppercase bg-red-100 mt-1 rounded-full px-2 ">{item.status}</p>
                                <button
                                    className="text-red-500 mx-auto my-2 hover:text-red-700 ml-4 btn btn-xs"
                                    onClick={() => handleDelete(item.productId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
                <div className="p-4 text-right border-t border-gray-200">
                    <p className="text-xl font-bold">Total: ${totalCartPrice.toFixed(2)}</p>
                </div>
                <div className="p-4 text-right">
                    <Link to={"/checkout"}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>

            {recentStatusItems.length > 0 && (
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
                    <h2 className="text-2xl font-bold text-center mb-4">Recent Status</h2>
                    {recentStatusItems.map((item) => (
                        <div key={item.productId} className="flex items-center p-4 border-b border-gray-200">
                            <div className="ml-4 flex-1">
                                <h2 className="text-xl font-semibold">{item.productName}</h2>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Price: ${!isNaN(parseFloat(item.price)) ? parseFloat(item.price).toFixed(2) : 'N/A'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">${!isNaN(parseFloat(item.price) * item.quantity) ? (parseFloat(item.price) * item.quantity).toFixed(2) : 'N/A'}</p>
                                <p className="text-sm font-bold text-blue-700 uppercase bg-red-100 mt-1 rounded-full px-2 ">{item.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;