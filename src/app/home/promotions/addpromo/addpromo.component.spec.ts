/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddpromoComponent } from './addpromo.component';

describe('AddpromoComponent', () => {
  let component: AddpromoComponent;
  let fixture: ComponentFixture<AddpromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
