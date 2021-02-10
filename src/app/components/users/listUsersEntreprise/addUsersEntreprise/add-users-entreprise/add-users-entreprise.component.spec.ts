import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersEntrepriseComponent } from './add-users-entreprise.component';

describe('AddUsersEntrepriseComponent', () => {
  let component: AddUsersEntrepriseComponent;
  let fixture: ComponentFixture<AddUsersEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
