import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikaProizvodaDialogComponent } from './slika-proizvoda-dialog.component';

describe('SlikaProizvodaDialogComponent', () => {
  let component: SlikaProizvodaDialogComponent;
  let fixture: ComponentFixture<SlikaProizvodaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlikaProizvodaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlikaProizvodaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
