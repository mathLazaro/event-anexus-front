import {
  Component,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import {
  RouterOutlet
} from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-auth-shell',
  standalone: true,
  imports: [RouterOutlet],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            opacity: 0,
          })
        ], { optional: true }),

        query(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ],
  template: `
    <main [@routeAnimations]="animationState">
      <router-outlet #outlet="outlet" (activate)="onActivate(outlet)"></router-outlet>
    </main>
  `,
})
export class AuthShellComponent implements AfterViewInit {
  animationState: string | undefined;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onActivate(outlet: RouterOutlet) {
    // Usa setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.animationState = outlet?.activatedRouteData?.['animation'];
    });
  }
}
