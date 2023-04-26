import classes from './Header.module.css';
import mealImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
   return (
      <>
         <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClickCart={props.onCartShow} />
         </header>
         <div className={classes['main-image']}>
            <img src={mealImage} alt='Delicious Food'/>
         </div>
      </>
   )
}

export default Header;