import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnimationComponent } from './show-animation.component';

describe('ShowAnimationComponent', () => {
  let component: ShowAnimationComponent;
  let fixture: ComponentFixture<ShowAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
