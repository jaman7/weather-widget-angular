import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { fadeInOut } from '@app/shared/animations/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  animations: [fadeInOut],
})
export class MainComponent {
  showOutlet = false;

  constructor(private router: Router) {}

  getActiveRoute(): string {
    return this.router.url;
  }

  onActivate(): void {
    this.showOutlet = true;
  }

  onDeactivate(): void {
    this.showOutlet = false;
  }

  getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | string {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
