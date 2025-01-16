import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const server_url = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await axios.get(`${server_url}/cart`);
                setCartProducts(response.data);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, [server_url]);

    const handleConfirm = async (productId) => {
        try {
            const response = await axios.put(`${server_url}/cart/${productId}`, { status: 'confirmed' });
            if (response.status === 200) {
                console.log(`Order confirmed for product ID: ${productId}`); 
                setCartProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.productId === productId ? { ...product, status: 'confirmed' } : product
                    )
                );
            }
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    // Filter products with status 'received'
    const receivedProducts = cartProducts.filter(product => product.status === 'received');

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-700">Product ID</th>
                        <th className="py-2 px-4 border-b border-gray-700">Product Name</th>
                        <th className="py-2 px-4 border-b border-gray-700">Quantity</th>
                        <th className="py-2 px-4 border-b border-gray-700">Paid Amount</th>
                        <th className="py-2 px-4 border-b border-gray-700">Status</th>
                        <th className="py-2 px-4 border-b border-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedProducts.map((product) => (
                        <tr key={product.productId} className="hover:bg-gray-700">
                            <td className="py-2 px-4 border-b border-gray-700">{product.productId}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{product.productName}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{product.quantity}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{product.price}</td>
                            <td className="py-2 px-4 border-b border-gray-700 text-green-600">{product.status}</td>
                            <td className="py-2 px-4 border-b border-gray-700">
                                <button
                                    onClick={() => handleConfirm(product.productId)}
                                    className="bg-green-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded"
                                >
                                    Confirm
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;