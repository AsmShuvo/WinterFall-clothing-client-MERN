import React from 'react';

const Item = ({ item }) => {
    const { name, size, prize, image, category } = item;
    return (
        <div className='m-4'>
            <div className="card card-compact bg-base-100  p-4 w-64">
                <figure>
                    <img
                        className='w-48 h-44 rounded-md'
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{size?.map(item => <i className='ml-1 font-semibold'>{item}</i>)}</p>
                    <div className="card-actions">
                        <button className="btn btn-accent text-white btn-xs">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;