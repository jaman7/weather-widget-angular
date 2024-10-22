import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
  transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
]);

export const ExpandCollapseHorizontal = [
  trigger('expandCollapseHorizontal', [
    state(
      'initial',
      style({
        opacity: '0',
        padding: '0',
        width: '0',
        right: '0',
        'transform-origin': 'center 0',
      })
    ),
    state(
      'final',
      style({
        opacity: '1',
        'transform-origin': 'center 0',
        right: '58px',
      })
    ),
    transition('initial=>final', animate('250ms')),
    transition('final=>initial', animate('250ms')),
  ]),
];
