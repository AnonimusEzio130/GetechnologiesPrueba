import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { FacturaService } from '../services/Factura.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-factura-list-available',
  templateUrl: './factura-list-available.component.html'
})
export class FacturaListAvailable {
  public identificacion: string;
  dataSourcePersonas!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public idUsuario: number;

  datasourceFactura!: MatTableDataSource<any>;
  FacturadisplayedColumns: string[] = [
    'id',
    'fecha',
    'monto',
    'accion'
  ];
  constructor(
    private _dialogRef: MatDialogRef<FacturaListAvailable>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _empService: FacturaService,
    private _coreService: CoreService
  ) {
    console.log(this.data);
    console.log(this.data);
    this.idUsuario = this.data.userId;
    this.identificacion = this.data.identificacion; // Obtener la identificación de los datos del diálogo
  }

  ngOnInit(): void {
    this.getFacturasPorIdentificacion();
  }

  viewFacturasPorIdentificacion(identificacion: string) {
    this._empService.getFacturasPorIdentificacion(identificacion).subscribe(
      (facturas) => {
        this.datasourceFactura = new MatTableDataSource(facturas);
        this.datasourceFactura.sort = this.sort;
        this.datasourceFactura.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener las facturas:', error);
      }
    );
  }

  getFacturasPorIdentificacion() {
    const identificacion = this.identificacion;


    this._empService.getFacturasPorIdentificacion(identificacion).subscribe(
      (facturas) => {
        this.datasourceFactura = new MatTableDataSource(facturas);
        this.datasourceFactura.sort = this.sort;
        this.datasourceFactura.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener las facturas:', error);
      }
      );
}
deleteFactura(id: number) {
  this._empService.deleteFactura(id).subscribe({
    next: (res) => {
      this._coreService.openSnackBar('Factura Eliminada!', 'Hecho');
    },
    error: (err) => console.log(err),
  });
}

getFacturaList() {
  this._empService.getFacturas().subscribe({
    next: (res) => {
      this.dataSourcePersonas = new MatTableDataSource(res);
      this.dataSourcePersonas.sort = this.sort;
      this.dataSourcePersonas.paginator = this.paginator;
    },
    error: console.log,
  });
}

  formatFecha(fecha: number): string {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  }
}