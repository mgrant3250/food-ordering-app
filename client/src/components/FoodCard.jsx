import { useEffect } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getTotalItemCount } from '../utils/cartUtils'
import { Link } from 'react-router-dom'
import './FoodCard.css'




const fetchMenu = async () => {
  const res = await fetch("http://localhost:5000/api/menu");
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
};

const FoodCard = ({cart, setCart, setCount}) => {


const { data: menu, isLoading, error } = useQuery({
    queryKey: ["menu"],     // unique cache key
    queryFn: fetchMenu,     // fetch function
    staleTime: 1000 * 60 * 5,   // 5 minutes 
    cacheTime: 1000 * 60 * 30,  // 30 minutes in memory
  });


  useEffect(() => {
    setCount(getTotalItemCount(cart))
  }, [cart])



    if (isLoading) return <p>Loading menu...</p>;
  

  if (error) return <p>Error loading menu.</p>;

  return (
    <>
    <div className='food-card-container'>
    {menu.entrees.map((item) => (
    <div key={item.name} className="food-card">
        <div className="food-card-image">
          <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} loading="lazy" />
        </div>
        <h2 className="food-card-title">{item.name}</h2>
        <div className="food-card-text">
          A delicious grilled hamburger with fresh lettuce, tomato, and cheese. Perfect for lunch or dinner.
        </div>
        <div className="food-card-price">
          <span>${item.price}</span>
          <Link to="/options" state={{item, menu}}> <button>Add to Cart</button> </Link>
        </div>
      </div>
      ))}
      </div>
    </>
  )
}

export default FoodCard