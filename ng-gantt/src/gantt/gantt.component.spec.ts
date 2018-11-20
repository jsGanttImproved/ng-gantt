import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttEditorComponent } from './gantt.component';

describe('GantteditorComponent', () => {
  let component: GanttEditorComponent;
  let fixture: ComponentFixture<GanttEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
