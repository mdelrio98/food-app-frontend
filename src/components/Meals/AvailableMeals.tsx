import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Api from '../../services/Api';


// We can reuse the Meal interface from our types definition if it matches
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
        const response = await Api.fetchMeals();
        if (response.status === 200) {
          const apiResponse = response.data; // apiResponse is GetMealsResponse { meals: Meal[] }
          if (apiResponse && Array.isArray(apiResponse.meals)) {
            setMeals(apiResponse.meals);
          } else {
            setMeals([]);
            console.error('API response for meals was not in the expected format or meals array is missing:', apiResponse);
            // Optionally, set an error state here to inform the user
            // setError('Failed to load meals: unexpected response format.');
          }
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

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal: Meal) => (
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
