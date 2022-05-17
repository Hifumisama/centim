import { DataSeries } from './interfaces';

export const mockData: DataSeries[] = [
  {
    id: 'a',
    username: 'Mehdi',
    amount: 10,
    category: 'Restaurant',
    reason: 'Restaurant de mariage',
  },
  {
    id: 'b',
    username: 'Sopia',
    amount: 50,
    category: 'Loisirs',
    reason: 'Escape game',
  },
  {
    id: 'c',
    username: 'Mehdi',
    amount: 500,
    category: 'Loyer',
    reason: 'Loyer belle maman',
  },
  {
    id: 'd',
    username: 'Sophia',
    amount: 80,
    category: 'Courses',
  },
  {
    id: 'e',
    username: 'Mehdi',
    amount: 150,
    category: 'Charges',
    reason: 'Facture internet',
  },
];

export const categories = [
  {
    id: 1,
    name: 'Loisirs',
    backgroundColor: '#42A5F5',
    description: '',
  },
  {
    id: 2,
    name: 'Restaurants',
    backgroundColor: '#42A5F5',
    description: '',
  },
  {
    id: 3,
    name: 'Courses',
    backgroundColor: '#42A5F5',
    description: '',
  },
  {
    id: 4,
    name: 'Charges',
    backgroundColor: '#42A5F5',
    description: '',
  },
  {
    id: 5,
    name: 'Loyer',
    backgroundColor: '#42A5F5',
    description: '',
  },
  {
    id: 6,
    name: 'Divers',
    backgroundColor: '#42A5F5',
    description: '',
  },
  {
    id: 7,
    name: 'Autres',
    backgroundColor: '#42A5F5',
    description: '',
  },
];
