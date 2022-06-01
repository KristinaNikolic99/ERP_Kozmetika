import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciDialogComponent } from './korisnici-dialog.component';

describe('KorisniciDialogComponent', () => {
  let component: KorisniciDialogComponent;
  let fixture: ComponentFixture<KorisniciDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisniciDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
