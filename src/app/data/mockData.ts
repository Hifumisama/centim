import { DataSeries } from './interfaces';

export const mockData: DataSeries[] = [
  {
    id: 'a',
    username: 'Mehdi',
    amount: 40,
    transactionDate: new Date('02/21/2022'),
    category: 'Restaurants',
    reason: 'Restaurant de mariage',
  },
  {
    id: 'b',
    username: 'Sopia',
    amount: 50,
    transactionDate: new Date('02/02/2022'),
    category: 'Loisirs',
    reason: 'Escape game',
  },
  {
    id: 'c',
    username: 'Mehdi',
    amount: 500,
    transactionDate: new Date('02/20/2022'),
    category: 'Loyer',
    reason: 'Loyer belle maman',
  },
  {
    id: 'd',
    username: 'Sophia',
    amount: 80,
    transactionDate: new Date('02/15/2022'),
    category: 'Courses',
  },
  {
    id: 'e',
    username: 'Mehdi',
    amount: 150,
    transactionDate: new Date('02/13/2022'),
    category: 'Charges',
    reason: 'Facture internet',
  },
  {
    id: 'f',
    username: 'Sophia',
    amount: 60,
    transactionDate: new Date('02/12/2022'),
    category: 'Charges',
    reason: 'Facture d eau',
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
    backgroundColor: '#eb0707',
    description: '',
  },
  {
    id: 3,
    name: 'Courses',
    backgroundColor: '#1fed22',
    description: '',
  },
  {
    id: 4,
    name: 'Charges',
    backgroundColor: '#ed641f',
    description: '',
  },
  {
    id: 5,
    name: 'Loyer',
    backgroundColor: '#1636c7',
    description: '',
  },
  {
    id: 6,
    name: 'Divers',
    backgroundColor: '#c010e3',
    description: '',
  },
  {
    id: 7,
    name: 'Autres',
    backgroundColor: '#6d6a6e',
    description: '',
  },
];
