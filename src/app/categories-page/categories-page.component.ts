import { Component, inject } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { CategoryCardComponent } from './category-card/category-card.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CONSTANTS } from '../app.config';
import { Category } from '../interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CategoryCardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './categories-page.component.html',
})
export class CategoriesPageComponent {
  currentEditing: Category | null = null;
  themes = CONSTANTS.themes;

  editingForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    theme: new FormControl(CONSTANTS.defaultTheme, {
      validators: [Validators.required],
    }),
  });

  categoriesService = inject(CategoriesService);

  editCategory(c: Category) {
    this.editingForm.setValue({
      name: c.name,
      theme: c.theme.bg,
    });
    this.currentEditing = c;
  }

  handleEditSubmit() {
    this.categoriesService.updateCategory(
      this.currentEditing?.id ?? '',
      this.editingForm.value.name ?? '',
      this.editingForm.value.theme ?? ''
    );
    this.currentEditing = null;
  }
}
