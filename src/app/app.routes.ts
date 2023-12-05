import { Routes } from '@angular/router';
import { NotesPageComponent } from './notes-page/notes-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { NewCategoryPageComponent } from './new-category-page/new-category-page.component';
import { NewNotePageComponent } from './new-note-page/new-note-page.component';
import { NotePageComponent } from './note-page/note-page.component';
import { EditNotePageComponent } from './edit-note-page/edit-note-page.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesPageComponent,
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
  },
  {
    path: 'new-category',
    component: NewCategoryPageComponent,
  },
  {
    path: 'new-note',
    component: NewNotePageComponent,
  },
  {
    path: 'notes/:id',
    component: NotePageComponent,
  },
  {
    path: 'edit-note/:id',
    component: EditNotePageComponent,
  },
];
