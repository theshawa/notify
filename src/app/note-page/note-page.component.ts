import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CONSTANTS } from '../app.config';
import { Note } from '../interfaces/note';
import { NotesService } from '../notes.service';
import { CategoriesService } from '../categories.service';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-page.component.html',
})
export class NotePageComponent implements OnInit, OnDestroy {
  location = inject(Location);
  route = inject(ActivatedRoute);
  router = inject(Router);
  notesService = inject(NotesService);
  categoriesService = inject(CategoriesService);
  defaultTheme: { bg: string; color: string } = {
    bg: CONSTANTS.light,
    color: CONSTANTS.dark,
  };
  note!: Note;

  close() {
    this.location.back();
  }

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

    this.defaultTheme = {
      bg: document.documentElement.style.background,
      color: document.documentElement.style.color,
    };
    document.documentElement.style.background =
      this.category?.theme.bg ?? this.defaultTheme.bg;
    document.documentElement.style.color =
      this.category?.theme.fg ?? CONSTANTS.dark;
  }

  get category() {
    return this.categoriesService.getCategoryById(this.note.category);
  }

  ngOnDestroy(): void {
    document.documentElement.style.background = this.defaultTheme.bg;
    document.documentElement.style.color = this.defaultTheme.color;
  }
}
