import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdavnicaDialogComponent } from './prodavnica-dialog.component';

describe('ProdavnicaDialogComponent', () => {
  let component: ProdavnicaDialogComponent;
  let fixture: ComponentFixture<ProdavnicaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdavnicaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdavnicaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
