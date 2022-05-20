import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingAnimComponent } from './typing-anim.component';

describe('TypingAnimComponent', () => {
  let component: TypingAnimComponent;
  let fixture: ComponentFixture<TypingAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingAnimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
