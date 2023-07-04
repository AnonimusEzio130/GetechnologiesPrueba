import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAddEditComponent } from './Factura-add-edit.component';

describe('EmpAddEditComponent', () => {
  let component: FacturaAddEditComponent;
  let fixture: ComponentFixture<FacturaAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaAddEditComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FacturaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
