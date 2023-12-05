import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CategoriesService } from '../../categories.service';
import { Note } from '../../interfaces/note';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../notes.service';
import { convert } from 'html-to-text';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-card.component.html',
})
export class NoteCardComponent {
  @Input({ required: true }) data!: Note;

  categoriesService = inject(CategoriesService);
  notesService = inject(NotesService);

  get category() {
    return this.categoriesService.getCategoryById(this.data.category);
  }

  get updatedAtString() {
    return Intl.DateTimeFormat('en-us', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(this.data.updatedAt);
  }

  deleteMe() {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(this.data.id);
    }
  }

  get content() {
    return convert(this.data.content, {});
  }
}
