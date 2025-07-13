import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './menu.css';
function Menu() {
    const { REstroID } = useParams();
    const [menu, setMenu] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
console.log("Menu component loaded")
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch(
                    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=31.3260152&lng=75.57618289999999&restaurantId=${REstroID}&catalog_qa=undefined&submitAction=ENTER`
                );
                const data = await res.json();

                const restaurantInfoCard = data?.data?.cards?.find(
                    (card) => card?.card?.card?.info
                );
                const info = restaurantInfoCard?.card?.card?.info;
                setRestaurantInfo(info);

                let itemsList = [];
                const regularCards = data?.data?.cards?.find(card => card?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards;

                if (regularCards) {
                    for (const section of regularCards) {
                        const items = section?.card?.card?.itemCards;
                        if (items && Array.isArray(items)) {
                            itemsList.push(...items);
                        }
                    }
                }

                setMenu(itemsList);
            } catch (err) {
                console.error('Error fetching menu:', err);
            }
        };

        fetchMenu();
    }, [REstroID]);

    return (
        <div className="menu-container">
            {restaurantInfo && (
                <div className="restaurant-details">
                    <h2>{restaurantInfo.name}</h2>
                    <p>{restaurantInfo.areaName}, {restaurantInfo.city}</p>
                    <p> {restaurantInfo.avgRating} | {restaurantInfo.totalRatingsString}</p>
                    <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurantInfo.cloudinaryImageId}`}
                        alt={restaurantInfo.name}
                        style={{ width: '200px', borderRadius: '10px' }}
                    />
                </div>
            )}

            <h3 style={{ marginTop: '30px' }}>Menu</h3>
            <div className="menu-list">
                {menu.map((item) => (
                    <div className="menu-item">
                        <h3>{item.card.info.name}</h3>
                           <h4>{item.card.info.category}</h4>
                           <img src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.card.info.imageId}`} alt={item.card.info.name} />
                    </div>
                ))}
            </div>


        </div>
    );
}

export default Menu;
