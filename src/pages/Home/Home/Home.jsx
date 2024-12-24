import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {
    return (
        <div>
            <Banner />
            <div className='mx-36 my-16'>
                <Categories />
            </div>
        </div>
    );
};

export default Home;