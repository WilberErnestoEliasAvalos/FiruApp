import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModalComponent } from './card-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('CardModalComponent', () => {
  let component: CardModalComponent;
  let fixture: ComponentFixture<CardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardModalComponent],
      providers: [
        { provide: NgbActiveModal, useValue: {} } // Proporciona un valor ficticio para NgbActiveModal
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});