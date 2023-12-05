import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../categories.service';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import { NgOptimizedImage } from '@angular/common';
import { NoteCardComponent } from './note-card/note-card.component';
import { Note } from '../interfaces/note';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgOptimizedImage,
    RouterLink,
    NoteCardComponent,
  ],
  templateUrl: './notes-page.component.html',
})
export class NotesPageComponent implements OnDestroy, OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  categoriesService = inject(CategoriesService);
  notesService = inject(NotesService);

  subscription!: Subscription;
  searchQuery = '';
  selectedCategory = '';

  showingNotes: Note[] = [];

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((v) => {
      this.searchQuery = v['search'] ?? '';
      this.selectedCategory = v['category'] ?? '';
      this.showingNotes = this.notesService.searchNotes(
        this.selectedCategory,
        this.searchQuery
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateQuery() {
    const queryParams = {};
    if (this.selectedCategory)
      Object.assign(queryParams, { category: this.selectedCategory });
    if (this.searchQuery)
      Object.assign(queryParams, { search: this.searchQuery });
    this.router.navigate(['/'], { queryParams });
  }

  constructor() {
    effect(() => {
      this.showingNotes = this.notesService.searchNotes(
        this.selectedCategory,
        this.searchQuery
      );
    });
  }
}
