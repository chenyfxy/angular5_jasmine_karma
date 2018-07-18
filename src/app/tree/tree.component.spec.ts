import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TreeComponent } from './tree.component';

import { Tree, NodeEvent } from 'ng2-tree';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Tree', () => {
  it('should detect empty string', () => {
    expect(Tree.isValueEmpty('  ')).toBe(true);
    expect(Tree.isValueEmpty(' \n \r ')).toBe(true);
    expect(Tree.isValueEmpty('\r')).toBe(true);
    expect(Tree.isValueEmpty(' \t ')).toBe(true);
    expect(Tree.isValueEmpty('  ')).toBe(true);

    expect(Tree.isValueEmpty('42')).toBe(false);
    expect(Tree.isValueEmpty(' 42  \n')).toBe(false);
    expect(Tree.isValueEmpty(' 42')).toBe(false);
    expect(Tree.isValueEmpty('42 ')).toBe(false);
  });
});

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('select event', fakeAsync(() => {
    const tree = new Tree(component.tree);
    const event = new NodeEvent(tree);

    spyOn(component, 'logEvent');

    component.logEvent(event);

    expect(component.logEvent).toHaveBeenCalled();
    expect(component.logEvent).toHaveBeenCalledWith(event);
  }));
});
