import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ItemDetails = () => {
    const server_url = import.meta.env.VITE_SERVER_URL;
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

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
            status: "pending"
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
        <div className="bg-gray-950 pt-20 pb-10 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-950 mb-4">
                            <img
                                className="w-full h-full object-cover"
                                src={itemDetails?.image}
                                alt="Product Image"
                            />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            Product Name
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 font-bold text-4xl mb-4">
                            {itemDetails?.name}
                        </p>
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Price:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    ${itemDetails.price}
                                </span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Availability:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    In Stock
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                Product Description:
                            </span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {itemDetails.details}
                            </p>
                        </div>
                        <div className="flex items-center mt-4 gap-4">
                            <label
                                htmlFor="quantity"
                                className="font-bold text-gray-700 dark:text-gray-300"
                            >
                                Quantity:
                            </label>
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
                        <div className="flex mt-3 -mx-2 mb-4">
                            <div className="px-2">
                                <button
                                    className="w-full btn border-none text-gray-200 bg-gray-900 py-2 px-4 rounded-full font-bold hover:bg-gray-950 dark:hover:bg-gray-950"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
