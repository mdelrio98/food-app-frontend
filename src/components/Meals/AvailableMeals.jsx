import Card from '../UI/Card.jsx';
import MealItem from './MealItem/MealItem.jsx';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';
import { useState, useEffect } from 'react';



const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({ id: mealKey, key:mealKey,name:mealsObj[mealKey].name, description: mealsObj[mealKey].description, price: mealsObj[mealKey].price });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(
      { url: '/api/meals' }, // Updated to use the mocked API endpoint
      transformMeals
    );
  }, [fetchMeals]);


  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  
  let content = mealsList;

  if (!mealsList.length > 0) {
    content = <p>Non-available foods</p>; 
  }


  if (error) {
    return <section className={classes.MealsError}>
    <p>{error}</p>
  </section>;
  }

  if (isLoading) {
    return  <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
