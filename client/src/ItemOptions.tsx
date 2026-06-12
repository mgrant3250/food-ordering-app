import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./ItemOptions.css";

import { addToCart as addToCartAction } from "./store/cartSlice";

import type { MenuItem, MenuResponse } from "./types/menu";
import type { CartItem } from "./types/Cart";
import type { AppDispatch } from "./store/store";

type ItemOptionsLocationState = {
  item: MenuItem;
  menu: MenuResponse;
};

const ItemOptions = () => {
  const location = useLocation();

  const state = location.state as ItemOptionsLocationState | null;

  const item = state?.item;
  const menu = state?.menu;

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!item || !menu) {
      navigate("/");
    }
  }, [item, menu, navigate]);

  const [selectedSide, setSelectedSide] = useState<string>("");
  const [selectedSauce, setSelectedSauce] = useState<string>("");
  const [selectedDrink, setSelectedDrink] = useState<string>("");

  const addToCart = () => {
    if (!item || !menu) return;

    const sidePrice =
      menu.sides.find(
        (side: MenuItem) => side.name === selectedSide
      )?.price ?? 0;

    const drinkPrice =
      menu.drinks.find(
        (drink: MenuItem) => drink.name === selectedDrink
      )
        ? 1.99
        : 0;

    const cartItem: CartItem = {
      ...item,

      cartItemId: `${item._id}-${selectedSide}-${selectedDrink}-${selectedSauce}`,

      baseItem: {
        _id: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
      },

      options: {
        side: selectedSide,
        sauce: selectedSauce,
        drink: selectedDrink,
      },

      quantity: 1,

      totalPrice:
        item.price +
        sidePrice +
        drinkPrice,
    };

    dispatch(addToCartAction(cartItem));

    navigate("/");
  };

  if (!item || !menu) {
    return null;
  }

  return (
    <div className="item-options-container">
      <h2>
        Customize Your{" "}
        <span className="item-name">
          {item.name}
        </span>
      </h2>

      <div className="option-group">
        <h3>Choose a Side:</h3>

        {menu.sides.map((side) => (
          <label
            key={side.name}
            className="option-label"
          >
            <input
              type="radio"
              name="side"
              value={side.name}
              checked={
                selectedSide === side.name
              }
              onChange={() =>
                setSelectedSide(side.name)
              }
            />

            <span>
              {side.name} - $
              {side.price.toFixed(2)}
            </span>
          </label>
        ))}
      </div>

      <div className="option-group">
        <h3>Choose a Sauce:</h3>

        {menu.sauces.map((sauce) => (
          <label
            key={sauce.name}
            className="option-label"
          >
            <input
              type="radio"
              name="sauce"
              value={sauce.name}
              checked={
                selectedSauce === sauce.name
              }
              onChange={() =>
                setSelectedSauce(sauce.name)
              }
            />

            <span>{sauce.name}</span>
          </label>
        ))}
      </div>

      <div className="option-group">
        <h3>Choose a Drink:</h3>

        {menu.drinks.map((drink) => (
          <label
            key={drink.name}
            className="option-label"
          >
            <input
              type="radio"
              name="drink"
              value={drink.name}
              checked={
                selectedDrink === drink.name
              }
              onChange={() =>
                setSelectedDrink(drink.name)
              }
            />

            <span>
              {drink.name} - $1.99
            </span>
          </label>
        ))}
      </div>

      <div className="summary">
        <h4>Your Choices:</h4>

        <p>
          <strong>Side:</strong>{" "}
          {selectedSide || "None"}
        </p>

        <p>
          <strong>Sauce:</strong>{" "}
          {selectedSauce || "None"}
        </p>

        <p>
          <strong>Drink:</strong>{" "}
          {selectedDrink || "None"}
        </p>
      </div>

      <button
        type="button"
        onClick={addToCart}
        className="submit-button"
      >
        Add to Order
      </button>
    </div>
  );
};

export default ItemOptions;