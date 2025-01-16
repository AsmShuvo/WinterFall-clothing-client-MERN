import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BankPage = () => {
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [cartData, setCartData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get(`${server_url}/cart`);
                setCartData(response.data);
            } catch (err) {
                setError('Failed to fetch cart data.');
            }
        };

        fetchCartData();
    }, [server_url]);

    const handleReceived = async (productId) => {
        try {
            await axios.put(`${server_url}/cart/${productId}`, { status: 'received' }); 
            setCartData(cartData.map(item => 
                item.productId === productId ? { ...item, status: 'received' } : item
            ));
        } catch (err) {
            setError('Failed to update product status.');
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Bank Transactions</h1>
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-700">Transaction ID</th>
                            <th className="px-4 py-2 border-b border-gray-700">Total Price</th>
                            <th className="px-4 py-2 border-b border-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="px-4 py-2 border-b border-gray-700">{item.transactionId || 'N/A'}</td>
                                <td className="px-4 py-2 border-b border-gray-700">
                                    ${!isNaN(parseFloat(item.price) * item.quantity) ? (parseFloat(item.price) * item.quantity).toFixed(2) : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-700">
                                    {item.status !== 'received' ? (
                                        <button
                                            onClick={() => handleReceived(item.productId)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Received
                                        </button>
                                    ) : (
                                        <span className="text-green-400">Received</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BankPage;