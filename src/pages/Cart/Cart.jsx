import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user?.email) return;

            try {
                const response = await axios.get(`${server_url}/cart`, {
                    params: { email: user.email }
                });
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch cart items.');
            }
        };

        fetchCartItems();
    }, [server_url, user?.email]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${server_url}/cart/${productId}`);
            setCartItems(cartItems.filter(item => item.productId !== productId));
        } catch (err) {
            setError('Failed to delete item from cart.');
        }
    };

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    const itemsWithoutTransactionId = cartItems.filter(item => !item.transactionId);
    const itemsWithTransactionId = cartItems.filter(item => item.transactionId);

    const totalCartPrice = itemsWithoutTransactionId.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (!isNaN(price) ? price * item.quantity : 0);
    }, 0);

    return (
        <div className="bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">Your Cart</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {itemsWithoutTransactionId.map((item) => {
                    const price = parseFloat(item.price);
                    const totalPrice = price * item.quantity;

                    return (
                        <div key={item.productId} className="flex items-center p-4 border-b border-gray-200 hover:bg-blue-50 transition duration-200">
                            <div className="ml-4 flex-1">
                                <h2 className="text-xl font-semibold text-purple-800">{item.productName}</h2>
                                <p className="text-gray-700">Quantity: {item.quantity}</p>
                                <p className="text-gray-700">Unit-Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-pink-600">${!isNaN(totalPrice) ? totalPrice.toFixed(2) : 'N/A'}</p>
                                <button
                                    className="text-red-500 mx-auto my-2 hover:text-red-700 ml-4"
                                    onClick={() => handleDelete(item.productId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
                <div className="p-4 text-right border-t border-gray-200 bg-gradient-to-r from-blue-100 to-purple-100">
                    <p className="text-xl font-bold text-purple-800">Total: ${totalCartPrice.toFixed(2)}</p>
                </div>
                <div className="p-4 text-right">
                    <Link to={"/checkout"}>
                        <button className="bg-gradient-to-r from-green-400 to-blue-600 text-white px-4 py-2 rounded hover:from-green-500 hover:to-blue-700 transition duration-200">
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>

            {itemsWithTransactionId.length > 0 && (
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
                    <h2 className="text-3xl font-bold text-center mb-4 text-green-600">Recent Status</h2>
                    {itemsWithTransactionId.map((item) => (
                        <div key={item.productId} className="flex items-center p-4 border-b border-gray-200 hover:bg-green-50 transition duration-200">
                            <div className="ml-4 flex-1">
                                <h2 className="text-xl font-semibold text-green-800">{item.productName}</h2>
                                <p className="text-gray-700">Quantity: {item.quantity}</p>
                                <p className="text-gray-700">Price: ${!isNaN(parseFloat(item.price)) ? parseFloat(item.price).toFixed(2) : 'N/A'}</p>
                                <p className="text-gray-700">Transaction ID: {item.transactionId}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-indigo-600">${!isNaN(parseFloat(item.price) * item.quantity) ? (parseFloat(item.price) * item.quantity).toFixed(2) : 'N/A'}</p>
                                <p className="text-green-600 capitalize font-mono">{item.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;