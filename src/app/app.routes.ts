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
    title: ({ queryParams }) => {
      const search = queryParams['search'];
      const category = queryParams['category'];
      return `${search ? "search:'" + search + "' | " : ''}Notes | Notify`;
    },
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    title: 'Categories | Notify',
  },
  {
    path: 'new-category',
    component: NewCategoryPageComponent,
    title: 'New Category | Notify',
  },
  {
    path: 'new-note',
    component: NewNotePageComponent,
    title: 'New Note | Notify',
  },
  {
    path: 'notes/:id',
    component: NotePageComponent,
    title: 'Notify',
  },
  {
    path: 'edit-note/:id',
    component: EditNotePageComponent,
    title: 'Edit Note | Notify',
  },
];
