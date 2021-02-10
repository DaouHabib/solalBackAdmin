import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEntrepriseComponent } from './users-entreprise.component';

describe('UsersEntrepriseComponent', () => {
  let component: UsersEntrepriseComponent;
  let fixture: ComponentFixture<UsersEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
