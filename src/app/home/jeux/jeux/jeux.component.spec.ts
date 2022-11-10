/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JeuxComponent } from './jeux.component';

describe('JeuxComponent', () => {
  let component: JeuxComponent;
  let fixture: ComponentFixture<JeuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
