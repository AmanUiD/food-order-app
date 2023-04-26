import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCarButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

   const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
   const cartCtx = useContext(CartContext);
   const { items } = cartCtx;
   const numberOfCartItems = items.reduce((currentItem, item) => {
      return currentItem + item.amount;
   }, 0);

   const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
   useEffect(() => {
      if (items.length === 0) {
         return;
      }
      setBtnIsHighlighted(true);
   }, [items])
   
   return (
      <button className={btnClasses} onClick={props.onClickCart}>
         <span className={classes.icon}>
            <CartIcon />
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>
            {numberOfCartItems}
         </span>
      </button>
   )
}

export default HeaderCartButton;