import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const CheckoutPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const server_url = import.meta.env.VITE_SERVER_URL;

    const [cartData, setCartData] = useState([]);
    const [accountNumber] = useState('123-456-7890'); // Fixed account number for Dutch Bangla Bank Ltd
    const [userData, setUserData] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            if (!user?.email) return;

            try {
                const response = await axios.get(`${server_url}/cart`, {
                    params: { email: user.email }
                });
                const itemsToCheckout = response.data.filter(item => !item.transactionId && item.status === 'pending');
                setCartData(itemsToCheckout);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setError('Failed to fetch cart items.');
            }
        };

        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                const response = await axios.get(`${server_url}/users`, {
                    params: { email: user.email }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            }
        };

        fetchCartData();
        fetchUserData();
    }, [server_url, user?.email]);

    const generateRandomTransactionId = () => {
        return 'TRX' + Math.floor(Math.random() * 1000000000);
    };

    const handlePay = async () => {
        if (!password) {
            Swal.fire('Error', 'Please enter your password.', 'error');
            return;
        }

        if (userData && userData.password !== password) {
            Swal.fire('Error', 'Incorrect password.', 'error');
            return;
        }

        const transactionId = generateRandomTransactionId();

        try {
            await Promise.all(cartData.map(async (item) => {
                await axios.put(`${server_url}/cart/${item.productId}`, {
                    transactionId,
                    status: 'paid',
                    email: user.email,
                });
            }));
            Swal.fire('Success', 'Your payment has been processed!', 'success');
            navigate('/cart');
        } catch (error) {
            console.error('Error processing payment:', error);
            Swal.fire('Error', 'Failed to process payment.', 'error');
        }
    };

    const totalPrice = cartData.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100">
                <div className="bg-red-200 text-red-800 p-6 rounded-lg shadow-lg">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!cartData.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white text-gray-700 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">No items to checkout.</h2>
                    <Link to="/products">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                            Browse Products
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-purple-700">Checkout Summary</h1>

                {/* Products List */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Products:</h2>
                    <ul className="space-y-4">
                        {cartData.map((item) => (
                            <li key={item.productId} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-700">{item.productName}</h3>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-600">Unit Price: ${item.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                    <span className="font-bold text-gray-800">Total Price:</span>
                    <span className="text-xl font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Account Number Display */}
                <div>
                    <p className='font-semibold text-gray-500'>Dutch Bangla Bank Ltd Account Number: <span className='text-lg'>{accountNumber}</span></p>
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Re-enter Your Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Pay Button */}
                <div>
                    <button
                        onClick={handlePay}
                        className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                    >
                        Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;