import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttEditorComponent } from './gantt/gantt.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GanttEditorComponent
  ],
  exports: [
    GanttEditorComponent
  ]
})
export class NgGanttEditorModule {

  public static forRoot(): ModuleWithProviders<NgGanttEditorModule> {

    return {
      ngModule: NgGanttEditorModule,
      providers: [
      ]
    };
  }
}
