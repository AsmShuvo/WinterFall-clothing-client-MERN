import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from './../../../provider/AuthProvider';

const ItemDetails = () => {
    const server_url = import.meta.env.VITE_SERVER_URL;
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_url}/products/${id}`);
                const data = await response.json();
                setItemDetails(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = async () => {
        const cartItem = {
            productId: itemDetails._id,
            productName: itemDetails.name,
            quantity: quantity,
            price: itemDetails.price * quantity,
            status: "pending",
            user: user?.email,
        };

        try {
            await axios.post(`${server_url}/cart`, cartItem);
            Swal.fire(`${quantity} ${itemDetails.name} added to the cart.`);
        } catch (err) {
            setError('Error adding item to the cart.');
        }
    };

    const handleQuantityChange = (action) => {
        if (action === 'increment') {
            setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99));
        } else if (action === 'decrement') {
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-900 text-white pt-20 pb-10 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4 mb-8 md:mb-0">
                        <div className="h-[460px] rounded-lg overflow-hidden shadow-lg mb-4">
                            <img
                                className="w-full h-full object-cover"
                                src={itemDetails?.image}
                                alt={itemDetails?.name}
                            />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-semibold mb-2">{itemDetails?.name}</h2>
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center justify-between">
                                <span className="font-bold">Price:</span>
                                <span className='text-xl font-bold'>BDT: {itemDetails.price}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold">Availability:</span>
                                <span>In Stock</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">Product Description:</span>
                            <p className="mt-2 text-sm">{itemDetails.details}</p>
                        </div>
                        <div className="flex items-center mt-4 gap-4">
                            <label className="font-bold">Quantity:</label>
                            <div className="flex items-center bg-gray-800 text-white rounded">
                                <button
                                    className="p-2 px-4"
                                    onClick={() => handleQuantityChange('decrement')}
                                >
                                    -
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    className="p-2 px-4"
                                    onClick={() => handleQuantityChange('increment')}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <button
                                className="w-full btn border-none bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-bold"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;