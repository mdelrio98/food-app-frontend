import React, { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

// Define la interfaz para las props del componente
interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

const MealItem: React.FC<MealItemProps> = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
    mealId: props.id,
    name: props.name,
    quantity: amount,
    price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        {/* El id se pasa aquí para asociar la etiqueta con el input en el formulario */}
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
