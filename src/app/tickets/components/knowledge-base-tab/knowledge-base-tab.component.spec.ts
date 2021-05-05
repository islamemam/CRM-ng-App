import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseTabComponent } from './knowledge-base-tab.component';

describe('KnowledgeBaseTabComponent', () => {
  let component: KnowledgeBaseTabComponent;
  let fixture: ComponentFixture<KnowledgeBaseTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeBaseTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeBaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
