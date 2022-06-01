import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodDialogComponent } from './proizvod-dialog.component';

describe('ProizvodDialogComponent', () => {
  let component: ProizvodDialogComponent;
  let fixture: ComponentFixture<ProizvodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
