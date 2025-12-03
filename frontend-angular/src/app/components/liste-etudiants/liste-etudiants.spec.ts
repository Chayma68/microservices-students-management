import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListeEtudiantsComponent } from './liste-etudiants.component';

describe('ListeEtudiantsComponent', () => {
  let component: ListeEtudiantsComponent;
  let fixture: ComponentFixture<ListeEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEtudiantsComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
