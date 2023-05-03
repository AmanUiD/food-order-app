
import Card from '../UI/Card';
import classes from './AvialableMeals.module.css';
import Mealitems from './MealItems/Mealitems';
import { useEffect, useState } from 'react';

const AvialableMeals = () => {
   const [meals, setMeals] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [httpError, setHttpError] = useState();

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('https://food-order-c7fd5-default-rtdb.firebaseio.com/meals.json');

         if (!response.ok) {
            throw new Error('Somthing went wrong!');
         }

         const responseData = await response.json();

         const loadMeals = [];

         for (let key in responseData) {
            loadMeals.push({
               id: key,
               name: responseData[key].name,
               description: responseData[key].description,
               price: responseData[key].price
            })
         }
         setMeals(loadMeals);
         setIsLoading(false);
      }

      fetchData().catch((error) => {
         setIsLoading(false);
         setHttpError(error.message);
      });

   }, []);

   if (isLoading) {
      return (
         <section className={classes.LoadingMeals}>
            <p>loading...</p>
         </section>
      )
   }

   if (httpError) {
      return (
         <section className={classes.MealsError}>
            <p>{httpError}</p>
         </section>
      )
   }

   const mealsList = meals.map(meals =>
      <Mealitems
         id={meals.id}
         key={meals.id}
         name={meals.name}
         description={meals.description}
         price={meals.price}
      />);
   return (
      <section className={classes.meals}>
         <Card>
            <ul>
               {mealsList}
            </ul>
         </Card>
      </section>
   )
}

export default AvialableMeals;