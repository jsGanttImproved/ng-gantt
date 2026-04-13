import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { NgGanttEditorModule } from 'ng-gantt';
import { AppComponent } from './app.component';
import { routes } from './app.module';
import { DemoComponent } from './demo/demo.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgGanttEditorModule.forRoot(),
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent, DemoComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
