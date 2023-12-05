import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Category } from '../../interfaces/category';
import { NotesService } from '../../notes.service';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  @Input({ required: true }) data!: Category;
  @Output('edit') editEvent = new EventEmitter();

  notesService = inject(NotesService);
  categoriesService = inject(CategoriesService);

  get createdAtString() {
    return Intl.DateTimeFormat('en-us', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(this.data.createdAt);
  }

  get notesCount() {
    return this.notesService.getNotesByCategory(this.data.id).length;
  }
}
