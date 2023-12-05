import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../categories.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesService } from '../notes.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RichEditor, config } from '../rich-editor';
@Component({
  selector: 'app-new-note-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CKEditorModule],
  templateUrl: './new-note-page.component.html',
})
export class NewNotePageComponent {
  location = inject(Location);
  categoriesService = inject(CategoriesService);
  notesService = inject(NotesService);

  editor = RichEditor;
  config = config;

  form = new FormGroup({
    category: new FormControl('', { validators: [Validators.required] }),
    title: new FormControl('', { validators: [Validators.required] }),
    content: new FormControl('', { validators: [Validators.required] }),
  });

  close() {
    this.location.back();
    if (
      this.form.value.category ||
      this.form.value.title ||
      this.form.value.content
    )
      localStorage.setItem('last-saved', JSON.stringify(this.form.value));
  }

  get selectedCategory() {
    return this.categoriesService.getCategoryById(
      this.form.value.category ?? ''
    );
  }

  get lastSaved() {
    return localStorage.getItem('last-saved');
  }

  loadLastSaved() {
    if (this.lastSaved) {
      this.form.setValue(JSON.parse(this.lastSaved));
    }
    localStorage.removeItem('last-saved');
  }

  handleSubmit() {
    this.notesService.createNewNote(
      this.form.value.category ?? '',
      this.form.value.title ?? '',
      this.form.value.content ?? ''
    );
    this.location.back();
    localStorage.removeItem('last-saved');
  }
}
