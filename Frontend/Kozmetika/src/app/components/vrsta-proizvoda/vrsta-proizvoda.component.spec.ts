import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstaProizvodaComponent } from './vrsta-proizvoda.component';

describe('VrstaProizvodaComponent', () => {
  let component: VrstaProizvodaComponent;
  let fixture: ComponentFixture<VrstaProizvodaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrstaProizvodaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrstaProizvodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
