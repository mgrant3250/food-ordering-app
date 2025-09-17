import { useState, useEffect, useCallback } from 'react'
import { updateCart, getTotalItemCount } from '../utils/cartUtils'
import './FoodCard.css'
import hamburger from '../assets/hamburger.jpg'
import fries from '../assets/fries.jpg'
import chickenTenders from '../assets/chicken-tenders.jpg'
import chickenSandwhich from '../assets/chicken-sandwhich.jpg'
import chickenWings from '../assets/chicken-wings.jpg'


const menu = {
    entrees: [
      {
      id: 1,
      name: "Hamburger",
      img: hamburger,
      price: 6.99
    },
    {
      id: 2,
      name: "Fries",
      img: fries,
      price: 2.99
    },
    {
      id: 3,
      name: "Chicken Tenders",
      img: chickenTenders,
      price: 5.99
    },
    {
      id: 4,
      name: "Chicken Sandwhich",
      img: chickenSandwhich,
      price: 6.99
    },
    {
      id: 5,
      name: "Chicken Wings",
      img: chickenWings,
      price: 4.99
    }],
    sides: [
      {
        name: "Fries",
        price: 2.99
      },
      {
        name: "Fruit Cup",
        price: 1.99
      },
      {
        name: "Caesar Salad",
        price: 2.99
      }
    ],
    sauces: [
      {
        name: "Ketchup"
      },
      {
        name: "Buffalo"
      },
      {
        name: "Barbeque"
      },
      {
        name: "Hot Mustard"
      },
      {
        name: "Sweet and Sour"
      }
    ],
    Drinks: [
      {
        name: "Coke"
      },
      {
        name: "Sprite"
      },
      {
        name: "Root Beer"
      },
      {
        name: "Lemonade"
      },
      {
        name: "Dr. Pepper"
      }
    ]
  };

const FoodCard = ({cart, setCart, setCount}) => {

  useEffect(() => {
    setCount(getTotalItemCount(cart))
  }, [cart])



  const addToCart = useCallback((item) => {
    setCart(prevCart => updateCart(prevCart, item));
  }, [setCart]);

  return (
    <>
    <div className='food-card-container'>
    {menu.entrees.map((item) => (
    <div key={item.id} className="food-card">
        <div className="food-card-image">
          <img src={item.img} alt="hamburger" />
        </div>
        <h2 className="food-card-title">{item.name}</h2>
        <div className="food-card-text">
          A delicious grilled hamburger with fresh lettuce, tomato, and cheese. Perfect for lunch or dinner.
        </div>
        <div className="food-card-price">
          <span>${item.price}</span>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      </div>
      ))}
      </div>
    </>
  )
}

export default FoodCard