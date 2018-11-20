import {
  Component, ElementRef, Input, OnInit, ViewChild
} from '@angular/core';
// import JSGantt = require('jsgantt-improved');
import {JSGantt} from 'jsgantt-improved';
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

  private _data: Object = {};

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
    const g = this.editor = new JSGantt.GanttChart(this.ganttEditorContainer.nativeElement, 'week');

    if (g.getDivId() != null) {

      // JSGantt.parseJSON('./fixes/data.json', g);

      // SET LANG FROM INPUT
      // lang = e && e.target ? e.target.value : 'pt';
      // delay = document.getElementById('delay').value;

      g.setOptions({
        vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
        vQuarterColWidth: 36,
        vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
        vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
        vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
        vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
        vShowEndWeekDate: 0,  // Show/Hide the date for the last day of the week in header for
        // daily view (1/0)
        // Set the threshold at which we will only use one cell per table row (0 disables).
        // Helps with rendering performance for large charts.
        vUseSingleCell: 10000,
        // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
        vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
      });
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

export type GanttEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';

export interface GanttEditorTreeNode {
  field: String,
  value: String,
  path: String[]
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
