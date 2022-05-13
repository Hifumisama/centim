import { Category, DataSeries } from "./interfaces";

export const mockData: DataSeries[] =  [
  {
    username: 'Mehdi',
    amount: 10,
    category: Category.Restaurant,
    reason: 'Restaurant de mariage',
  },
  {
    username: 'Sopia',
    amount: 50,
    category: Category.Loisirs,
    reason: 'Escape game',
  },
  {
    username: 'Mehdi',
    amount: 500,
    category: Category.Loyer,
    reason: 'Loyer belle maman',
  },
  {
    username: 'Sophia',
    amount: 80,
    category: Category.Courses,
  },
  {
    username: 'Mehdi',
    amount: 150,
    category: Category.Charges,
    reason: 'Facture internet',
  }
]
