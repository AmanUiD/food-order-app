import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
   const [isAmountValid, setIsAmountValid] = useState(true);
   const amountInputRef = useRef()
   const subitHandler = (event) => {
      event.preventDefault();
      
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;
      console.log(enteredAmountNumber);
      

      if (
         enteredAmount.trim().length === 0 ||
         enteredAmountNumber < 1 ||
         enteredAmountNumber > 5) {
            setIsAmountValid(false);
         return;
      }
      props.onAddToCart(enteredAmountNumber);
   }
   return (
      <form className={classes.form} onSubmit={subitHandler}>
         <Input
            label="Amount"
            ref={amountInputRef}
            input={{
               type: 'number',
               id: 'amount' + props.id,
               min: '1',
               max: '5',
               step: '1',
               defaultValue: '1'
            }} />
         <button>+ Add</button>
         {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
      </form>
   )
}
export default MealItemForm;