import { Injectable, signal } from '@angular/core';
import { Category } from './interfaces/category';
import { CONSTANTS } from './app.config';
import tinycolor from 'tinycolor2';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private data = signal<Category[]>([]);

  get categories() {
    return this.data().sort((a, b) =>
      a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0
    );
  }

  getCategoryById(id: string) {
    return this.categories.find((c) => c.id === id);
  }

  addCategory(name: string, bg: string) {
    this.data.update((c) => {
      return [
        ...c,
        {
          createdAt: Date.now(),
          id: v4(),
          name,
          theme: {
            bg,
            fg:
              tinycolor(bg).getBrightness() > 100
                ? CONSTANTS.dark
                : CONSTANTS.light,
          },
          updatedAt: Date.now(),
        },
      ];
    });
    this.save();
  }

  updateCategory(id: string, name: string, bg: string) {
    this.data.update((c) => {
      return c.map((ct) => {
        if (ct.id === id) {
          return {
            ...ct,
            name,
            theme: {
              bg,
              fg:
                tinycolor(bg).getBrightness() > 100
                  ? CONSTANTS.dark
                  : CONSTANTS.light,
            },
            updatedAt: Date.now(),
          };
        }
        return ct;
      });
    });
    this.save();
  }

  deleteCategory(id: string) {
    this.data.update((c) => c.filter((ct) => ct.id !== id));
    this.save();
  }

  private save() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  constructor() {
    if (localStorage.getItem('categories')) {
      try {
        this.data.set(JSON.parse(localStorage.getItem('categories') ?? '[]'));
      } catch (error) {}
    }
  }
}
