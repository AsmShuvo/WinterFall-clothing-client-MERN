import React, { useEffect, useState } from 'react';
import Item from '../../Item/Item';

const Categories = () => {
    const server_ur = import.meta.env.VITE_SERVER_URL;
    const [maleClothes, setMaleClothes] = useState([]);
    const [femaleClothes, setFemaleClothes] = useState([]);
    const [kidsClothes, setKidsClothes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_ur}/products`);
                const data = await response.json();
                console.log("Data: ", data);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const males = data.filter(item => item.category === 'Male').slice(0, 4);
                const females = data.filter(item => item.category === 'Female').slice(0, 4);
                const kids = data.filter(item => item.category === 'Kids').slice(0, 4);

                setMaleClothes(males);
                setFemaleClothes(females);
                setKidsClothes(kids);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div role="tablist" className="tabs tabs-lifted">
                {/* Male Collection (Active by Default) */}
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Male Collection"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h2>Male Collection</h2>
                    <ul className="flex">
                        {maleClothes.map(item => (
                            <Item key={item.id_no} item={item} />
                        ))}
                    </ul>
                    <button className='border btn btn-xs text-center mx-auto w-full'>see more...</button>
                </div>


                {/* Female Collection */}
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Female Collection"
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h2>Female Collection</h2>
                    <ul className="flex">
                        {femaleClothes.map(item => (
                            <Item key={item.id_no} item={item} />
                        ))}
                    </ul>
                    <button className='border btn btn-xs text-center mx-auto w-full'>see more</button>
                </div>

                {/* Kids Collection */}
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Kids Collection"
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h2>Kids Collection</h2>
                    <ul className="flex">
                        {kidsClothes.map(item => (
                            <Item key={item.id_no} item={item} />
                        ))}
                    </ul>
                    <button className='border btn btn-xs text-center mx-auto w-full'>see more</button>
                </div>
            </div>
        </div>
    );
};

export default Categories;
