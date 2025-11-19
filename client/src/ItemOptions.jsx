import {useState, useEffect, useCallback} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./ItemOptions.css"
import { getTotalItemCount, updateCart} from './utils/cartUtils'


const ItemOptions = ({cart, setCart, setCount}) => {
  const location = useLocation();
  const navigate = useNavigate();
    const { item, menu } = location.state || {};
  
    const [selectedSide, setSelectedSide] = useState('');
    const [selectedSauce, setSelectedSauce] = useState('');
    const [selectedDrink, setSelectedDrink] = useState('');

     useEffect(() => {
        setCount(getTotalItemCount(cart))
      }, [cart])
    
    
    
      const addToCart = () => {
        setCart(prevCart =>
        updateCart(prevCart, item, selectedDrink, selectedSide, menu)
  );
        navigate("/")
};
  
    return (
      <>
          <div className="item-options-container">
        <h2>Customize Your <span className="item-name">{item?.name}</span></h2>
  
        <div className="option-group">
          <h3>Choose a Side:</h3>
          {menu?.sides?.map((side) => (
            <label key={side.name} className="option-label">
              <input
                type="radio"
                name="side"
                value={side.name}
                checked={selectedSide === side.name}
                onChange={() => setSelectedSide(side.name)}
              />
              <span>{side.name} - ${side.price.toFixed(2)}</span>
            </label>
          ))}
        </div>
  
        <div className="option-group">
          <h3>Choose a Sauce:</h3>
          {menu?.sauces?.map((sauce) => (
            <label key={sauce.name} className="option-label">
              <input
                type="radio"
                name="sauce"
                value={sauce.name}
                checked={selectedSauce === sauce.name}
                onChange={() => setSelectedSauce(sauce.name)}
              />
              <span>{sauce.name}</span>
            </label>
          ))}
        </div>
  
        <div className="option-group">
          <h3>Choose a Drink:</h3>
          {menu?.drinks?.map((drink) => (
            <label key={drink.name} className="option-label">
              <input
                type="radio"
                name="drink"
                value={drink.name}
                checked={selectedDrink === drink.name}
                onChange={() => setSelectedDrink(drink.name)}
              />
              <span>{drink.name} - $1.99</span>
            </label>
          ))}
        </div>
  
        <div className="summary">
          <h4>Your Choices:</h4>
          <p><strong>Side:</strong> {selectedSide || 'None'}</p>
          <p><strong>Sauce:</strong> {selectedSauce || 'None'}</p>
          <p><strong>Drink:</strong> {selectedDrink || 'None'}</p>
        </div>

        <button type="submit" onClick={() => addToCart(item, selectedDrink, selectedSide, menu)} className="submit-button">Add to Order</button>
      </div>
      </>
    )
}

export default ItemOptions