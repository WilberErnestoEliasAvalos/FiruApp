import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';
import { PublicacionesService } from '../publicaciones.service';
import { Firestore } from '@angular/fire/firestore';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryComponent ],
      providers: [
        PublicacionesService,
        { provide: Firestore, useValue: {} } // Proporcionamos un valor para Firestore
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});