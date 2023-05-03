import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
   const [isChechout, setIsCheckout] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmitting, setDidSubmitting] = useState(false);
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
   const submitOrderHandler = async (userdata) => {
      setIsSubmitting(true);
      await fetch('https://food-order-c7fd5-default-rtdb.firebaseio.com/order.json', {
         method: 'POST',
         body: JSON.stringify({
            user: userdata,
            ordereditems: cartCtx.items
         })
      })
      setIsSubmitting(false);
      setDidSubmitting(true);
      cartCtx.clearCart();
   };



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
   const cartModalContent =
      (
         <>
            {cartitems}
            <div className={classes.total}>
               <span>Total Amount</span>
               <span>{totalAmount}</span>
            </div>
            {isChechout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
            {!isChechout && modalAction}
         </>
      );
   const isSubmittingModalContent = <p>Sending order data...</p>;

   const didSubmitModalContent = (
      <>
         <p>Successfully sent the order!</p>
         <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>close</button>
         </div>
      </>
   )
   return (
      <Modal onClose={props.onClose}>
         {!isSubmitting && !didSubmitting && cartModalContent}
         {isSubmitting && isSubmittingModalContent}
         {!isSubmitting && didSubmitting && didSubmitModalContent}
      </Modal>
   )
}

export default Cart;