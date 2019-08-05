# Angular Gantt Editor

Angular Gantt Editor (wrapper for [jsgantt-improved](https://github.com/jsGanttImproved/jsgantt-improved)). View/Edit Gantt file with formatting.

[StackBlitz template](https://stackblitz.com/edit/angular-ng-gantt)

Working with latest Angular 8. 

![Demo Image](/src/demo.png)

## Installation

To install this library with npm, run below command:

$ npm install --save jsgantt-improved ng-gantt

## Usage

### Configuration

First, Import Angular  GanttEditor module in root

```ts
import { NgGanttEditorModule } from 'ng-gantt' 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ....,
    NgGanttEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Then setup your component models as below :

```ts
import { Component, ViewChild } from '@angular/core';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';

@Component({
  selector: 'app-root',
  template: '<ng-gantt [options]="editorOptions" [data]="data"></ng-gantt>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public editorOptions: GanttEditorOptions;
  public data: any;
  @ViewChild(GanttEditorComponent, { static: true }) editor: GanttEditorComponent;

  constructor() { 
    this.editorOptions = new GanttEditorOptions()
     this.data2 = [{
      'pID': 1,
      'pName': 'Define Chart API',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    }]; 
  }
}
```
Note : For better styling, add below line to your main style.css file

```ts
@import "~jsgantt-improved/dist/jsgantt.css";
```

# Demo

Demo component files are included in Git Project.

When publishing it to npm, look over this docs: https://docs.npmjs.com/misc/developers

# License
MIT(./LICENSE)
