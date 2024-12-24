import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/clothes.json'); // Fetch from public folder
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                // Find the item by id
                const item = data.find((item) => item.id_no.toString() === id);

                if (!item) {
                    throw new Error('Item not found');
                }

                setItemDetails(item);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [id]);

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
                            <img className="w-full h-full object-cover" src={itemDetails?.image} alt="Product Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="px-2">
                                <button className="w-full btn border-none text-gray-200 bg-gray-900 py-2 px-4 rounded-full font-bold hover:bg-gray-950 dark:hover:bg-gray-950">Add to Cart</button>
                            </div> 
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Product Name</h2>
                        <p className="text-gray-600 dark:text-gray-300 font-bold text-4xl mb-4">
                            {itemDetails?.name}
                        </p>
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300">${itemDetails.price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability : </span> 
                                <span className="text-gray-600 dark:text-gray-300"> In Stock</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {itemDetails.details}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ItemDetails;
