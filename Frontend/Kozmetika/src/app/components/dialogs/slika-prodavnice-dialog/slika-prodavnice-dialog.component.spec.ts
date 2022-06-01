import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikaProdavniceDialogComponent } from './slika-prodavnice-dialog.component';

describe('SlikaProdavniceDialogComponent', () => {
  let component: SlikaProdavniceDialogComponent;
  let fixture: ComponentFixture<SlikaProdavniceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlikaProdavniceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlikaProdavniceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
