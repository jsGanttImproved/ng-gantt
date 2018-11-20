import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  public editorOptions: GanttEditorOptions;
  public data: any;
  public data2: any;

  @ViewChild('editor') editor: GanttEditorComponent;
  @ViewChild('editorTwo') editorTwo: GanttEditorComponent;

  constructor() {
    this.editorOptions = new GanttEditorOptions();
    this.initEditorOptions();
  }

  ngOnInit() {

    this.data = {
      'randomNumber': 10,
      'products': [
        {
          'name': 'car',
          'product':
            [
              {
                'name': 'honda',
                'model': [
                  { 'id': 'civic', 'name': 'civic' },
                  { 'id': 'accord', 'name': 'accord' }, { 'id': 'crv', 'name': 'crv' },
                  { 'id': 'pilot', 'name': 'pilot' }, { 'id': 'odyssey', 'name': 'odyssey' }
                ]
              }
            ]
        }
      ]
    };

    this.data2 = {
      'nedata': 'test'
    };

    // this.editorOptions.onChange = this.change.bind(this);
  }

  change() {
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);
  }

  initEditorOptions() {

  }

  setLanguage(lang) {

  }

  customLanguage() {
    // this.editorOptions.languages = {
    //   'pt-BR': {
    //     'auto': 'Automático testing'
    //   },
    //   'en': {
    //     'auto': 'Auto testing'
    //   }
    // };
    this.editor.setOptions(this.editorOptions);
  }

  changeObject() {
    this.data.randomNumber = Math.random() * 100;
  }

  changeData() {
    this.data = Object.assign({}, this.data,
      { randomNumber: Math.random() * 100 });
  }

  /**
   * Example on how get the json changed from the jsgantt
   */
  getData() {
    // const changedGantt = this.editor.get();
    // console.log(changedGantt);
  }
}
