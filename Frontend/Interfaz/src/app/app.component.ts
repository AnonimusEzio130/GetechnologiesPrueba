import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacturaAddEditComponent } from './Factura-add-edit/Factura-add-edit.component';
import { UserAddEditComponent} from './usuario-add-edit/usuario-add-edit.component';
import { FacturaListAvailable } from './facctura-list-available/facctura-list-available.component';
import { FacturaService } from './services/Factura.service';
import { UsuarioService } from './services/Persona.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  PersonadisplayedColumns: string[] = [
    'id',
    'Name',
    'last-name',
    'last-name2',
    "identificacion",
    'Bill',
    'action',
  ];

  dataSourcePersonas!: MatTableDataSource<any>;
  dataSourceUsuario!: MatTableDataSource<any>;
  datasourceFactura!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    
    private _dialog: MatDialog,
    private _empService: FacturaService,
    private _PersonaService : UsuarioService,
    private _coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getFacturaList();
    this.getPersonaList();
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(FacturaAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFacturaList();
          this.getPersonaList();
        }
      },
    });
  }
  openAddEditUserForm() {
    const dialogRef = this._dialog.open(UserAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersonaList();
        }
      },
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
  viewFacturasPorIdentificacion(identificacion: string) {
    console.log("Llama al evento");
    this._empService.getFacturasPorIdentificacion(identificacion).subscribe(
      (facturas) => {
        const dialogRef = this._dialog.open(FacturaListAvailable, {
          data: {
            facturas,
            identificacion // Pasar la identificación como parte de los datos del diálogo
          }
        });
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getFacturaList();
              this.getPersonaList();
            }
          },
        });
      },
      (error) => {
        console.error('Error al obtener las facturas:', error);
      }
    );
  }

  openFacturaListDialog() {
    const dialogRef = this._dialog.open(FacturaListAvailable, {
      data: {
        datasourceFactura: this.datasourceFactura
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFacturaList();
          this.getPersonaList();
        }
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUsuario.paginator) {
      this.dataSourceUsuario.paginator.firstPage();
    }
  }



  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FacturaAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFacturaList();
        }
      },
    });
  }
  //Seccion de Usuario, Persona
  getPersonaList() {
    this._PersonaService.getUsuarioList().subscribe({
      next: (res) => {
        this.dataSourceUsuario = new MatTableDataSource(res);
        this.dataSourceUsuario.sort = this.sort;
        this.dataSourceUsuario.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  deleteUsuario(id: number) {
    this._PersonaService.deleteUsuario(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Persona Eliminada!', 'Realizado');
        this.getFacturaList();
      },
      error: (err) => console.log(err),
    });
  }
  viewFacturas(row: any){
    this.viewFacturasPorIdentificacion(row.identificacion);
  }
}
