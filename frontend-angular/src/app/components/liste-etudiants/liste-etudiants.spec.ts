import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEtudiants } from './liste-etudiants.component';

describe('ListeEtudiants', () => {
  let component: ListeEtudiants;
  let fixture: ComponentFixture<ListeEtudiants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEtudiants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEtudiants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
