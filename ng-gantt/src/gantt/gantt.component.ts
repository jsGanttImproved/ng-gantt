import {
  Component, ElementRef, Input, OnInit, ViewChild
} from '@angular/core';
// import { JSGantt } from 'jsgantt-improved';
import * as JSGantt from 'jsgantt-improved';
console.log(JSGantt);
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-gantt',
  template: '<div [id]="id" #ganttEditorContainer></div>'
})

export class GanttEditorComponent implements OnInit {
  private editor: any;
  public id = 'anggantteditor' + Math.floor(Math.random() * 1000000);
  public optionsChanged = false;

  @ViewChild('ganttEditorContainer') ganttEditorContainer: ElementRef;

  private _data;

  @Input() options: GanttEditorOptions = new GanttEditorOptions();
  @Input('data')
  set data(value: Object) {
    this._data = value;
    if (this.editor) {
      this.editor.destroy();
      this.ngOnInit();
    }
  }

  constructor() {

  }

  ngOnInit() {
    let optionsBefore = this.options;
    if (!this.optionsChanged && this.editor) {
      optionsBefore = this.editor.options;
    }
    // document.getElementById('embedded-Gantt')
    const g = this.editor = new (<any>JSGantt).GanttChart(this.ganttEditorContainer.nativeElement, 'week');

    if (g.getDivId() != null) {

      // JSGantt.parseJSON('./fixes/data.json', g);

      g.setOptions({
        vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
        vQuarterColWidth: 36,
        vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
        vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
        vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
        vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
        vShowEndWeekDate: 0,  // Show/Hide the date for the last day of the week in header for
        vUseSingleCell: 10000,
        // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
        vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
      });
      if (this._data && this._data.forEach) {
        this._data.forEach(row => {
          row.pGantt = g;
          g.AddTaskItemObject(row);
        })
      }
      g.Draw();
    }
  }

  // public get(): JSON {
  //   return this.editor.get();
  // }

  public setOptions(newOptions: GanttEditorOptions) {
    if (this.editor) {
      this.editor.destroy();
    }
    this.optionsChanged = true;
    this.options = newOptions;
    this.ngOnInit();
  }

  public destroy() {
    this.editor.destroy();
  }
}

export class GanttEditorOptions {

  // public onEditable: (node: GanttEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };
  // public theme: Number;
  // public language: String;
  // public languages: Object;

  constructor() {
    // this.escapeUnicode = false;
    // this.sortObjectKeys = false;
    // this.history = true;
  }

}
