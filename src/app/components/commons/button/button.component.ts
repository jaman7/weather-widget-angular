import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() id: string | number;
  @Input() name = '';
  @Input() icon = '';
  @Input() disabled = false;
  @Input() type = '';
  @Input() isRound = false;
  @Input() customClass: string | string[] = '';
  @Input() tooltipTitle: string = '';
  @Output() btnClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() btnClickId: EventEmitter<string | any> = new EventEmitter();

  onClickButton(event: MouseEvent, id?: string): void {
    this.btnClick.emit(event);
    this.btnClickId.emit(id ?? this.id ?? null);
  }

  get combinedClasses(): string {
    return ['default-button', ...this.customClass, this.isRound ? 'round' : ''].join(' ');
  }

  get ariaLabel(): string {
    return this.name || 'button';
  }
}
