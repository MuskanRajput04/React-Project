import React, { useEffect, useState } from 'react';
import './Food.css';
import { Link } from 'react-router-dom';

function Food() {
  const [restaurant, setRestaurants] = useState([]);
console.log("food component loaded")
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.3260152&lng=75.57618289999999&page_type=DESKTOP_WEB_LISTING`
        );
        const data = await res.json();
        const cards = data?.data?.cards || [];

        const restaurantCard = cards.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        if (restaurantCard) {
          const restaurantsList =
            restaurantCard.card.card.gridElements.infoWithStyle.restaurants;
          setRestaurants(restaurantsList);
        }
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="food-container">
      <h2>Jalandhar Restaurants</h2>
      <div className="food-list">
        {restaurant.map((item) => (
          <Link
            to={`/food/menu/${item.info.id}`} 
            key={item.info.id}
            className="food-item"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.info.cloudinaryImageId}`}
              alt={item.info.name}
            />
            <h3>{item.info.name}</h3>
            {/* <button className="cart">Add to Cart</button> */}
            <p>ID: {item.info.id}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Food;
