import MockAdapter from 'axios-mock-adapter';
import api from '../services/axiosInstance';

// Create a new instance of the mock adapter on the axiosInstance
const mock = new MockAdapter(api, { delayResponse: 500 });

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
mock.onGet('/meals').reply(200, {
  success: true,
  data: DUMMY_MEALS,
});

export default mock;
