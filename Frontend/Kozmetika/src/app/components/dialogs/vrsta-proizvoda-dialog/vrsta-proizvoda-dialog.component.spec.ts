import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstaProizvodaDialogComponent } from './vrsta-proizvoda-dialog.component';

describe('VrstaProizvodaDialogComponent', () => {
  let component: VrstaProizvodaDialogComponent;
  let fixture: ComponentFixture<VrstaProizvodaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrstaProizvodaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrstaProizvodaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
