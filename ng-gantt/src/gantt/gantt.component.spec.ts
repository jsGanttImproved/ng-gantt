import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as JSGantt from 'jsgantt-improved';

import { GanttEditorComponent } from './gantt.component';

describe('GanttEditorComponent', () => {
  let component: GanttEditorComponent;
  let fixture: ComponentFixture<GanttEditorComponent>;
  let mockEditorInstance: any;

  function buildMockEditor(overrides: any = {}): any {
    return {
      getDivId: jasmine.createSpy('getDivId').and.returnValue('mock-div-id'),
      setOptions: jasmine.createSpy('setOptions'),
      AddTaskItemObject: jasmine.createSpy('AddTaskItemObject'),
      Draw: jasmine.createSpy('Draw'),
      options: {},
      ...overrides
    };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GanttEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockEditorInstance = buildMockEditor();
    spyOn(JSGantt as any, 'GanttChart').and.returnValue(mockEditorInstance);

    fixture = TestBed.createComponent(GanttEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // destroy()
  // ---------------------------------------------------------------------------

  describe('destroy()', () => {
    it('should clear the container innerHTML when an editor exists', () => {
      const container = component.ganttEditorContainer.nativeElement;
      container.innerHTML = '<div>stale chart content</div>';

      component.destroy();

      expect(container.innerHTML).toBe('');
    });

    it('should null out the editor reference when an editor exists', () => {
      expect(component.getEditor()).not.toBeNull();

      component.destroy();

      expect(component.getEditor()).toBeNull();
    });

    it('should be a no-op (not throw) when editor is already null', () => {
      component.destroy(); // first call nulls the editor
      expect(() => component.destroy()).not.toThrow();
    });

    it('should not clear the container when editor is null', () => {
      const container = component.ganttEditorContainer.nativeElement;
      container.innerHTML = '<div>existing content</div>';
      component.destroy(); // null the editor

      component.destroy(); // second call — should leave the DOM untouched
      expect(container.innerHTML).toBe('<div>existing content</div>');
    });
  });

  // ---------------------------------------------------------------------------
  // data setter
  // ---------------------------------------------------------------------------

  describe('data setter', () => {
    it('should store the supplied value', () => {
      const rows = [{ pID: 1, pName: 'Task A' }];
      component.data = rows;
      // Access via getEditor flow: the data should have been passed to AddTaskItemObject
      expect(mockEditorInstance.AddTaskItemObject).toHaveBeenCalled();
    });

    it('should call destroy() then re-initialise when an editor already exists', () => {
      const destroySpy = spyOn(component, 'destroy').and.callThrough();
      const initSpy = spyOn(component, 'ngOnInit').and.callThrough();

      component.data = [{ pID: 2, pName: 'Task B' }];

      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(initSpy).toHaveBeenCalledTimes(1);
    });

    it('should still call ngOnInit when no prior editor exists but container is available', () => {
      // Reset so there is no editor
      component.destroy();
      (JSGantt as any).GanttChart.calls.reset();

      const initSpy = spyOn(component, 'ngOnInit').and.callThrough();
      component.data = [{ pID: 3, pName: 'Task C' }];

      expect(initSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call ngOnInit when ganttEditorContainer is not yet available', () => {
      // Simulate the case where the setter fires before the view is initialised
      (component as any).ganttEditorContainer = undefined;
      component.destroy(); // clear editor so we test the no-editor branch

      const initSpy = spyOn(component, 'ngOnInit').and.callThrough();
      component.data = [{ pID: 4, pName: 'Task D' }];

      expect(initSpy).not.toHaveBeenCalled();
    });

    it('should create a fresh GanttChart instance on each data update', () => {
      const callsBefore = (JSGantt as any).GanttChart.calls.count();
      component.data = [{ pID: 5, pName: 'Task E' }];
      const callsAfter = (JSGantt as any).GanttChart.calls.count();

      expect(callsAfter).toBe(callsBefore + 1);
    });

    it('should register each data row with AddTaskItemObject', () => {
      const rows = [
        { pID: 10, pName: 'Task 1' },
        { pID: 11, pName: 'Task 2' },
        { pID: 12, pName: 'Task 3' }
      ];

      component.data = rows;

      expect(mockEditorInstance.AddTaskItemObject).toHaveBeenCalledTimes(rows.length);
    });

    it('should set pGantt on each row to the new editor instance', () => {
      const rows = [{ pID: 20, pName: 'Task X' }];
      component.data = rows;

      expect(rows[0].pGantt).toBe(component.getEditor());
    });
  });

  // ---------------------------------------------------------------------------
  // redrawOnResize input & onWindowResize()
  // ---------------------------------------------------------------------------

  describe('redrawOnResize input', () => {
    it('should default to true', () => {
      expect(component.redrawOnResize).toBeTrue();
    });
  });

  describe('onWindowResize()', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('should redraw the chart after 200 ms when redrawOnResize is true', () => {
      const destroySpy = spyOn(component, 'destroy').and.callThrough();
      const initSpy    = spyOn(component, 'ngOnInit').and.callThrough();

      component.onWindowResize();
      jasmine.clock().tick(200);

      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(initSpy).toHaveBeenCalledTimes(1);
    });

    it('should not redraw when redrawOnResize is false', () => {
      component.redrawOnResize = false;
      const destroySpy = spyOn(component, 'destroy').and.callThrough();
      const initSpy    = spyOn(component, 'ngOnInit').and.callThrough();

      component.onWindowResize();
      jasmine.clock().tick(200);

      expect(destroySpy).not.toHaveBeenCalled();
      expect(initSpy).not.toHaveBeenCalled();
    });

    it('should debounce: only one redraw when called multiple times within 200 ms', () => {
      const destroySpy = spyOn(component, 'destroy').and.callThrough();

      component.onWindowResize();
      jasmine.clock().tick(50);
      component.onWindowResize();
      jasmine.clock().tick(50);
      component.onWindowResize();
      jasmine.clock().tick(200);

      expect(destroySpy).toHaveBeenCalledTimes(1);
    });

    it('should not redraw when the editor is null', () => {
      component.destroy(); // null out the editor
      const initSpy = spyOn(component, 'ngOnInit').and.callThrough();

      component.onWindowResize();
      jasmine.clock().tick(200);

      expect(initSpy).not.toHaveBeenCalled();
    });

    it('should fire on a native window resize event when redrawOnResize is true', () => {
      const destroySpy = spyOn(component, 'destroy').and.callThrough();

      window.dispatchEvent(new Event('resize'));
      jasmine.clock().tick(200);

      expect(destroySpy).toHaveBeenCalledTimes(1);
    });

    it('should not fire on a native window resize event when redrawOnResize is false', () => {
      component.redrawOnResize = false;
      const destroySpy = spyOn(component, 'destroy').and.callThrough();

      window.dispatchEvent(new Event('resize'));
      jasmine.clock().tick(200);

      expect(destroySpy).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // ngOnDestroy()
  // ---------------------------------------------------------------------------

  describe('ngOnDestroy()', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('should cancel a pending resize redraw on destroy', () => {
      const destroySpy = spyOn(component, 'destroy').and.callThrough();
      const initSpy    = spyOn(component, 'ngOnInit').and.callThrough();

      component.onWindowResize();    // starts the 200 ms timer
      component.ngOnDestroy();       // should cancel it
      jasmine.clock().tick(200);

      // destroy() is called only once — by ngOnDestroy itself? No — ngOnDestroy
      // only clears the timer; it does not call destroy(). So neither spy fires.
      expect(initSpy).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // destroy() + data setter interaction
  // ---------------------------------------------------------------------------

  describe('destroy() then data setter interaction', () => {
    it('should leave the container clean before re-rendering', () => {
      const container = component.ganttEditorContainer.nativeElement;
      // Simulate stale content from a previous render
      container.innerHTML = '<div id="stale">old chart</div>';

      component.data = [{ pID: 30, pName: 'Fresh Task' }];

      // After destroy clears innerHTML and GanttChart re-renders, the stale
      // content should be gone (GanttChart writes its own output)
      expect(container.querySelector('#stale')).toBeNull();
    });

    it('should expose the new editor via getEditor() after re-render', () => {
      const firstEditor = component.getEditor();
      const newMock = buildMockEditor();
      (JSGantt as any).GanttChart.and.returnValue(newMock);

      component.data = [{ pID: 40, pName: 'New Task' }];

      expect(component.getEditor()).toBe(newMock);
      expect(component.getEditor()).not.toBe(firstEditor);
    });
  });
});
