import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
   const [isChechout, setIsCheckout] = useState(false);
   const cartCtx = useContext(CartContext);
   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
   const hasItems = cartCtx.items.length > 0;


   const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
   };

   const cartItemAddHandler = (item) => {
      cartCtx.addItem({ ...item, amount: 1 });
   };
   const orderHandler = () => {
      setIsCheckout(true);
   }

   const cartitems = (
      <ul className={classes['cart-items']}>
         {cartCtx.items.map(item =>
            <CartItem
               key={item.id}
               name={item.name}
               amount={item.amount}
               price={item.price}
               onAdd={cartItemAddHandler.bind(null, item)}
               onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
         )}
      </ul>
   );

   const modalAction = (
      <div className={classes.actions}>
         <button className={classes['button--alt']} onClick={props.onClose}>close</button>
         {hasItems && <button className={classes.button} onClick={orderHandler}>order</button>}
      </div>
   )
   return (
      <Modal onClose={props.onClose}>
         {cartitems}
         <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
         {isChechout && <Checkout onCancel={props.onClose} />}
         {!isChechout && modalAction}
      </Modal>
   )
}

export default Cart;