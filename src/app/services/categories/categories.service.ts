import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/interfaces/interfaces';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _categorySource = new BehaviorSubject<Category[]>([]);
  readonly Category$ = this._categorySource.asObservable();

  constructor(private readonly supabaseService: SupabaseService) {}

  getCategory(): Category[] {
    return this._categorySource.getValue();
  }

  private _setCategory(Category: Category[]) {
    this._categorySource.next(Category);
  }

  addCategory(Category: Category): void {
    const debts = [...this.getCategory(), Category];
    this._setCategory(debts);
  }

  removeCategory(id: string): void {
    const debts = this.getCategory().filter((Category) => Category.id !== id);
    this._setCategory(debts);
  }

  updateCategory(category: Category): void {
    const debts = this.getCategory().map((currentCategory) => {
      if (currentCategory.id !== category.id) {
        return currentCategory;
      }
      return category;
    });
    this._setCategory(debts);
  }

  async fetchCategory() {
    let { data: dettes, error } = await this.supabaseService.supabase
      .from('categories')
      .select();
    this._setCategory(dettes as Category[]);
  }

  async upsertCategory(categorie: Category) {
    let { data: editedCategorie, error } = await this.supabaseService.supabase
      .from('categories')
      .upsert(categorie);
    if (editedCategorie) {
      if (!categorie.id) {
        this.addCategory(editedCategorie[0] as Category);
      } else {
        this.updateCategory(editedCategorie[0] as Category);
      }
    }
  }

  async deleteCategory(id: string) {
    await this.supabaseService.supabase
      .from('categories')
      .delete()
      .match({ id });
    this.removeCategory(id);
  }
}
