import React from 'react';

const Item = ({ item }) => {
    const { name, size, price, image, category } = item;
    return (
        <div className='m-4'>
            <div className="card card-compact bg-base-100  p-4 w-64">
                <figure>
                    <img
                        className='w-48 h-52 rounded-md'
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p><span className='text-gray-700 font-semibold text-sm'>Available Size :</span> {size?.map(item => <span className='ml-1 text-gray-500 font-semibold text-xs'>{item}</span>)}</p>
                    <p className='font-bold'>$ {price}</p>
                    <div className="card-actions">
                        <button className="btn btn-accent text-white btn-xs">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;