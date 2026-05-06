import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  darkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      document.body.classList.toggle('dark-theme', this.darkMode());
    });
  }

  toggle() {
    this.darkMode.update(v => !v);
  }
}