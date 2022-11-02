import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-category-color',
  templateUrl: './category-color.component.html',
  styleUrls: ['./category-color.component.scss'],
})
export class CategoryColorComponent implements OnInit {
  @Input() categoryName!: string;

  categories!: Category[];
  backgroundSelected!: string;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.Category$.subscribe((categories) => {
      this.categories = categories;
    });
    if (this.categoryName) {
      this.backgroundSelected =
        this.categories.find((category) => category.name === this.categoryName)
          ?.backgroundColor || 'white';
    }
  }
}
