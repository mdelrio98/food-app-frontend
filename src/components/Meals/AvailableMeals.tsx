import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Api from '../../services/Api';


// We can reuse the Product interface from our types definition if it matches
// or create a specific one if needed. For now, let's define it locally for clarity.
interface Meal {
  id: string;
  name: string;
  description?: string;
  price: number;
}

const AvailableMeals: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await Api.fetchProducts();
        if (response.status === 200) {
          // The API returns the array directly in the 'data' property.
          setMeals(response.data.meals);
        } else {
          throw new Error(response.statusText || 'Failed to fetch meals.');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setIsLoading(false);
        } 
    };

    loadMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }


  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description || ''}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {meals.length > 0 ? <ul>{mealsList}</ul> : <p>No meals found.</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
