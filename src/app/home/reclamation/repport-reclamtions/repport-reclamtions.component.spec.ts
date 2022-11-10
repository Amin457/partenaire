/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RepportReclamtionsComponent } from './repport-reclamtions.component';

describe('RepportReclamtionsComponent', () => {
  let component: RepportReclamtionsComponent;
  let fixture: ComponentFixture<RepportReclamtionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepportReclamtionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepportReclamtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
