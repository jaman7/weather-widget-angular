import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForTrackByIndexDirective, Item } from './ngFor-trackByIndex.directive';

@Component({
  template: `
    <div *ngFor="let item of items; trackBy: ngForTrackByIndex" class="item">
      {{ item.name }}
    </div>
  `,
})
class TestComponent {
  items: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
}

describe('NgForTrackByIndexDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElements: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NgForTrackByIndexDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElements = fixture.debugElement.queryAll(By.css('.item'));
  });

  it('should render items correctly', () => {
    expect(debugElements.length).toBe(3);
    expect(debugElements[0].nativeElement.textContent.trim()).toBe('Item 1');
    expect(debugElements[1].nativeElement.textContent.trim()).toBe('Item 2');
    expect(debugElements[2].nativeElement.textContent.trim()).toBe('Item 3');
  });
});
