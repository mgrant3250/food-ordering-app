import { useEffect, useCallback } from "react"
import { getImageUrl } from '../utils/image'
import './FoodCard.css'
import { useNavigate } from 'react-router-dom'
import FoodCardText from './FoodCardText'
import { useSelector, useDispatch } from "react-redux";
import { loadMenu } from "../store/menuSlice"
import Spinner from "./Spinner"


const FoodCard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const { entrees, drinks, sides, sauces, loading, error } = useSelector((state) => state.menu);

    useEffect(() => {
    if(!entrees.length){
      dispatch(loadMenu());
    }
  }, [dispatch, entrees.length]);


// const { data: menu, isLoading, error, refetch } = useQuery({
//     queryKey: ["menu"],     // unique cache key
//     queryFn: fetchMenu,     // fetch function
//     staleTime: 1000 * 60 * 5,   // 5 minutes 
//     cacheTime: 1000 * 60 * 30,  // 30 minutes in memory
//   });


  const handleAddToCart = useCallback((item) => {
    navigate('/options', { state: { item, menu: { entrees, drinks, sides, sauces } } });
  }, [navigate, entrees, drinks, sides, sauces])

if(loading) return <Spinner />

if (!loading && !error && entrees.length === 0)
  return <p>No menu items available.</p>;
  

  if (error)
  return (
    <div>
      <p>Error loading menu.</p>
      <button onClick={() => dispatch(loadMenu())}>
        Retry
      </button>
    </div>
  );

  return (
    <>
    <section className='food-card-container'>
    {(entrees || []).map((item) => (
    <article key={item?._id} className="food-card">

        <div className="food-card-image">
          <img 
          src={getImageUrl(item?.imageUrl)} 
          alt={item?.name || "Food item"} 
          loading="lazy" />
        </div>

        <h2 className="food-card-title">{item?.name}</h2>
        <FoodCardText text={item.description} maxLength={150} />
        <div className="food-card-price">
          <span>${item.price.toFixed(2)}</span>
          <button onClick={() => handleAddToCart(item) } aria-label={`Add ${item.name} to cart`}>Add to Cart</button>
        </div>
        
      </article>
      ))}
      </section>
    </>
  )
}

export default FoodCard