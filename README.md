# Angular Gantt Editor

Angular Gantt Editor (wrapper for [jsgantt](https://github.com/josdejong/jsgantt)). View/Edit Gantt file with formatting.

[StackBlitz template](https://stackblitz.com/edit/angular-ng-gantt)

Working with latest Angular 6. 

![Demo Image](/src/assets/printDemo.png)

## Installation

To install this library with npm, run below command:

$ npm install --save jsgantt ang-jsgantt

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
  @ViewChild(GanttEditorComponent) editor: GanttEditorComponent;

  constructor() { 
    this.editorOptions = new GanttEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
      
      this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}
  }

}
```
Note : For better styling, add below line to your main style.css file

```ts
@import "~jsgantt/dist/jsgantt.min.css";
```

# Demo

Demo component files are included in Git Project.

Demo Project with a lot of different implementations (ngInit, change event and others):
[https://github.com/mariohmol/ang-jsgantt/tree/master/src/app/demo)

When publishing it to npm, look over this docs: https://docs.npmjs.com/misc/developers

# License
MIT(./LICENSE)
