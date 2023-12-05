import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CONSTANTS } from '../app.config';
import { CategoriesService } from '../categories.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-category-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-category-page.component.html',
})
export class NewCategoryPageComponent {
  categoriesService = inject(CategoriesService);
  location = inject(Location);
  themes = CONSTANTS.themes;

  newForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    theme: new FormControl(CONSTANTS.defaultTheme, {
      validators: [Validators.required],
    }),
  });

  close() {
    this.location.back();
  }

  handleNewSubmit() {
    this.categoriesService.addCategory(
      this.newForm.value.name ?? '',
      this.newForm.value.theme ?? ''
    );
    this.newForm.reset({
      name: '',
      theme: CONSTANTS.defaultTheme,
    });
    this.close();
  }
}
