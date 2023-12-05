import { Injectable, signal } from '@angular/core';
import { Note } from './interfaces/note';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private data = signal<Note[]>([]);

  get notes() {
    return this.data().sort((a, b) =>
      a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0
    );
  }

  getNotesByCategory(category: string) {
    return this.notes.filter((n) => n.category === category);
  }

  getNoteById(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  searchNotes(category: string, sq: string) {
    let cn = this.notes;
    if (category) {
      cn = this.getNotesByCategory(category);
    }
    if (sq) {
      cn = cn.filter(
        (n) =>
          n.title.toLowerCase().startsWith(sq.toLowerCase()) ||
          n.title.toLowerCase().includes(sq.toLowerCase()) ||
          n.content.toLowerCase().startsWith(sq.toLowerCase()) ||
          n.content.toLowerCase().includes(sq.toLowerCase())
      );
    }
    return cn;
  }

  createNewNote(category: string, title: string, content: string) {
    this.data.update((n) => [
      ...n,
      {
        category,
        content,
        createdAt: Date.now(),
        id: v4(),
        title,
        updatedAt: Date.now(),
      },
    ]);
    this.save();
  }

  updateNote(id: string, category: string, title: string, content: string) {
    this.data.update((n) =>
      n.map((nt) => {
        if (nt.id === id)
          return { ...nt, category, title, content, updatedAt: Date.now() };
        return nt;
      })
    );
    this.save();
  }

  deleteNote(id: string) {
    this.data.update((n) => n.filter((nt) => nt.id !== id));
    this.save();
  }

  private save() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  constructor() {
    if (localStorage.getItem('notes')) {
      try {
        this.data.set(JSON.parse(localStorage.getItem('notes') ?? '[]'));
      } catch (error) {}
    }
  }
}
