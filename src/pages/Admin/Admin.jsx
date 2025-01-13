import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [cartItems, setCartItems] = useState([]);
    const server_url = import.meta.env.VITE_SERVER_URL; // Corrected the variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${server_url}/cart`);
                setCartItems(response.data);
                console.log("All cart item: ", response.data); // Assuming response.data is an array of cart items
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchData();
    }, [server_url]);

    const handleApprove = (itemId) => {
        console.log(`Approved item with ID: ${itemId}`);
    };

    return (
        <div className='min-h-screen px-20'>
            <h1 className="text-2xl font-bold mb-4">Cart Items</h1>
            <ul>
                {cartItems?.map(item => (
                    <li key={item.productId} className="flex justify-between items-center border-b py-2">
                        <div className='flex flex-col'>
                            <span className='text-xs text-gray-600'>Product Id: {item.productId}</span> {/* Adjust according to your data structure */}
                            <span>Product Name: {item.productName}</span> {/* Adjust according to your data structure */}
                            <span>Total Price: {item.price}</span> {/* Adjust according to your data structure */}
                            <span>Quantity: {item.quantity}</span> {/* Adjust according to your data structure */}
                        </div>
                        <button
                            onClick={() => handleApprove(item.id)}
                            className="bg-blue-500 btn-xs text-white rounded"
                        >
                            Approve
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;