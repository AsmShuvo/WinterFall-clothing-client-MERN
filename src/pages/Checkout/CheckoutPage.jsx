import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [cartData, setCartData] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get(`${server_url}/cart`);
                setCartData(response.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [server_url]);

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
        switch (method) {
            case 'bkash':
                setAccountNumber('017XXXXXXXX');
                break;
            case 'rocket':
                setAccountNumber('018XXXXXXXX');
                break;
            case 'nagad':
                setAccountNumber('019XXXXXXXX');
                break;
            default:
                setAccountNumber('');
        }
    };

    const handleConfirm = async () => {
        if (!transactionId) {
            Swal.fire('Error', 'Please enter a transaction ID', 'error');
            return;
        }

        try {
            await Promise.all(cartData.map(async (item) => {
                await axios.put(`${server_url}/cart/${item.productId}`, {
                    transactionId,
                });
            }));
            Swal.fire('Success', 'Transaction confirmed!', 'success');
            navigate('/cart');
        } catch (error) {
            console.error('Error updating cart:', error);
            Swal.fire('Error', 'Failed to confirm transaction', 'error');
        }
    };

    const totalPrice = cartData.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

    if (!cartData.length) {
        return <div className="min-h-screen flex items-center justify-center text-lg font-medium">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Checkout Summary</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Products</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {cartData.map((item, index) => (
                            <li key={index} className="text-gray-600">
                                {item.productName} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span></h2>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Select Payment Method</h2>
                    <div className="flex justify-around">
                        {['bkash', 'rocket', 'nagad'].map(method => (
                            <button
                                key={method}
                                className={`px-4 py-2 rounded-lg ${selectedMethod === method ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => handleMethodChange(method)}
                            >
                                {method.charAt(0).toUpperCase() + method.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                {selectedMethod && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-green-700 mb-1">Account Number: {accountNumber}</h2>
                        <small className='text-xs font-serif text-gray-400 '>Please pay the total amount through the payment method you choose and fill the next field with the accurate trxId</small>
                        <input
                            type="text"
                            placeholder="Enter Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full px-4 py-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
                <div className="text-center">
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;