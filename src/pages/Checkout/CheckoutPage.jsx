import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [cartData, setCartData] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`${server_url}/cart`);
                const data = await response.json();

                const productIds = data.map(item => item.productId);
                const productNames = data.map(item => item.productName);
                const totalPrice = data.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

                setCartData({
                    productIds,
                    productNames,
                    totalPrice
                });
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

    const handleConfirm = () => {
        if (!transactionId) {
            Swal.fire('Please enter the transaction ID.');
            return;
        }

        const updatedCartData = {
            ...cartData,
            method: selectedMethod,
            trxId: transactionId
        };
        Swal.fire({
            title: "Congratulations!",
            text: "Your payment proceedure is complete. Please wait for our confirmation",
            icon: "success"
        });
        console.log('Updated Cart Data:', updatedCartData);

        axios.post(`${server_url}/checkout`, updatedCartData);

        navigate("/cart");
    };

    if (!cartData) {
        return <div className="min-h-screen flex items-center justify-center text-lg font-medium">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Checkout Summary</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Products</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {cartData.productNames.map((name, index) => (
                            <li key={index} className="text-gray-600">{name}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Product IDs</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {cartData.productIds.map((id, index) => (
                            <li key={index} className="text-gray-600">{id}</li>
                        ))}
                    </ul>
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Total Price: <span className="text-green-600">${cartData.totalPrice.toFixed(2)}</span></h2>
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