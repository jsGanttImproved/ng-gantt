import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgGanttEditorModule } from 'ng-gantt';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: 'demo', component: DemoComponent }
];

@NgModule({
  declarations: [
    AppComponent, DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgGanttEditorModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
