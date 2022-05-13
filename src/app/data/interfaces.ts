export interface DataSeries {
  username: string,
  amount: number,
  category: Category
  reason?: string
}

export enum Category {
  Loisirs,
  Restaurant,
  Courses,
  Charges,
  Loyer,
  Divers,
  Autres,
}
