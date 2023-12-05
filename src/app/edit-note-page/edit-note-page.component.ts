import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { CategoriesService } from '../categories.service';
import { RichEditor, config } from '../rich-editor';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Note } from '../interfaces/note';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-edit-note-page',
  standalone: true,
  imports: [ReactiveFormsModule, CKEditorModule],
  templateUrl: './edit-note-page.component.html',
})
export class EditNotePageComponent implements OnInit {
  location = inject(Location);
  route = inject(ActivatedRoute);
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  notesService = inject(NotesService);
  note!: Note;

  editor = RichEditor;
  config = config;

  form = new FormGroup({
    category: new FormControl('', { validators: [Validators.required] }),
    title: new FormControl('', { validators: [Validators.required] }),
    content: new FormControl('', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/not-found'], { replaceUrl: true });
      return;
    }
    const currentNote = this.notesService.getNoteById(id);
    if (!currentNote) {
      this.router.navigate(['/not-found'], { replaceUrl: true });
      return;
    }
    this.note = currentNote;
    this.form.setValue({
      category: this.note.category,
      content: this.note.content,
      title: this.note.title,
    });
  }

  close() {
    this.location.back();
  }

  get selectedCategory() {
    return this.categoriesService.getCategoryById(
      this.form.value.category ?? ''
    );
  }

  handleSubmit() {
    this.notesService.updateNote(
      this.note.id,
      this.form.value.category ?? '',
      this.form.value.title ?? '',
      this.form.value.content ?? ''
    );
    this.close();
  }

  reset() {
    this.form.setValue({
      category: this.note.category,
      content: this.note.content,
      title: this.note.title,
    });
  }

  get changed() {
    return (
      this.note.title !== this.form.value.title ||
      this.note.content !== this.form.value.content ||
      this.note.category !== this.form.value.category
    );
  }
}
