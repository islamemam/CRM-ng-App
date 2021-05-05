import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoResponseComponent } from './auto-response.component';

describe('AutoResponseComponent', () => {
  let component: AutoResponseComponent;
  let fixture: ComponentFixture<AutoResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
