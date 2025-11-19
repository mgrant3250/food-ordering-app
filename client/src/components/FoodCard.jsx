import { useEffect } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getTotalItemCount } from '../utils/cartUtils'
import { getImageUrl } from '../utils/image'
import { fetchMenu } from '../api/menu'
import './FoodCard.css'
import { useNavigate } from 'react-router-dom'


const FoodCard = ({cart, setCount}) => {

  const navigate = useNavigate();


const { data: menu, isLoading, error, refetch } = useQuery({
    queryKey: ["menu"],     // unique cache key
    queryFn: fetchMenu,     // fetch function
    staleTime: 1000 * 60 * 5,   // 5 minutes 
    cacheTime: 1000 * 60 * 30,  // 30 minutes in memory
  });


  const handleAddToCart = (item) => {
    navigate('/options', { state: { item, menu } });
  }

  useEffect(() => {
    setCount(getTotalItemCount(cart))
  }, [cart])



  if (isLoading) return <p>Loading menu...</p>;
  

  // if (error) return <p>Error loading menu.</p>;

  if (error)
  return (
    <div>
      <p>Error loading menu.</p>
      <button onClick={() => refetch()}>Retry</button>
    </div>
  );

  return (
    <>
    <div className='food-card-container'>
    {menu.entrees.map((item) => (
    <div key={item?._id} className="food-card">
        <div className="food-card-image">
          <img 
          src={getImageUrl(item?.imageUrl)} 
          alt={item?.name || "Food item"} 
          loading="lazy" />
        </div>
        <h2 className="food-card-title">{item?.name}</h2>
        <div className="food-card-text">
          {item.description}
        </div>
        <div className="food-card-price">
          <span>${item.price}</span>
          <button onClick={() => handleAddToCart(item) } aria-label={`Add ${item.name} to cart`}>Add to Cart</button>
        </div>
      </div>
      ))}
      </div>
    </>
  )
}

export default FoodCard