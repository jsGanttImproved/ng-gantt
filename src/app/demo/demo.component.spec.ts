import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgGanttEditorModule } from 'ng-gantt';
import { DemoComponent } from './demo.component';
import { FormsModule } from '@angular/forms';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgGanttEditorModule.forRoot()
      ],
      declarations: [ DemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
