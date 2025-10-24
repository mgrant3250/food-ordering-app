import { useState, useEffect, useCallback } from 'react'
import { updateCart, getTotalItemCount } from '../utils/cartUtils'
import { Link } from 'react-router-dom'
import './FoodCard.css'



const FoodCard = ({cart, setCart, setCount}) => {

  const[menu, setMenu] = useState(null);

  useEffect(() => {
  fetch('http://localhost:5000/api/menu')
    .then(res => res.json())
    .then(data => setMenu(data))
    .catch(err => console.error(err));
}, []);


  useEffect(() => {
    setCount(getTotalItemCount(cart))
  }, [cart])



  // const addToCart = useCallback((item) => {
  //   setCart(prevCart => updateCart(prevCart, item));
  // }, [setCart]);

    if (!menu) {
    return <p>Loading menu...</p>;
  }

  return (
    <>
    <div className='food-card-container'>
    {menu.entrees.map((item) => (
    <div key={item.name} className="food-card">
        <div className="food-card-image">
          <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} />
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