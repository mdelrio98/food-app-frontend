import ReactDOM from 'react-dom/client';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import './index.css';
import App from './App.jsx';

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

// Sample meal data
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.50,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

// Mock GET request to /api/meals
// You can change the URL if you prefer something else, e.g., '/meals.json'
// Ensure AvailableMeals.js calls this exact URL.
mock.onGet('/api/meals').reply(200, DUMMY_MEALS);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
