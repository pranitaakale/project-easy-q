import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenQuestComponent } from './gen-quest.component';

describe('GenQuestComponent', () => {
  let component: GenQuestComponent;
  let fixture: ComponentFixture<GenQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
