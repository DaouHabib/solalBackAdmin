import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersEntrepriseComponent } from './list-users-entreprise.component';

describe('ListUsersEntrepriseComponent', () => {
  let component: ListUsersEntrepriseComponent;
  let fixture: ComponentFixture<ListUsersEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
