import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  router = inject(Router);

  get hideNavBar() {
    return (
      ['/new-category', '/new-note'].includes(this.router.url) ||
      this.router.url.includes('/notes/') ||
      this.router.url.includes('/edit-note/')
    );
  }
}
