import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { FacturaService } from '../services/Factura.service';

@Component({
  selector: 'app-Factura-add-edit',
  templateUrl: './Factura-add-edit.component.html',
  styleUrls: ['./Factura-add-edit.component.scss'],
})
export class FacturaAddEditComponent implements OnInit {
  FacturaForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _facturaService: FacturaService,
    private _dialogRef: MatDialogRef<FacturaAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.FacturaForm = this._fb.group({
      monto: '',
      persona: this._fb.group({
        id:undefined
      })
    });
  }

  ngOnInit(): void {
    this.FacturaForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.FacturaForm.valid) {
      if (this.data) {
        this._facturaService
          .updateFactura(this.data.id, this.FacturaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Datos de la Factura actualizados!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._facturaService.addFactura(this.FacturaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Factura Añadida Correctamente');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
