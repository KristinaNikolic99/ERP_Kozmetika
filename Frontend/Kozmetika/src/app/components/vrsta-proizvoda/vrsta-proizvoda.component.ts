import { Component, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { VrstaProizvoda } from 'src/app/models/VrstaProizvoda/vrsta-proizvoda';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { VrstaProizvodaService } from 'src/app/services/VrstaProizvoda/vrsta-proizvoda.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { VrstaProizvodaDialogComponent } from '../dialogs/vrsta-proizvoda-dialog/vrsta-proizvoda-dialog.component';

@Component({
  selector: 'app-vrsta-proizvoda',
  templateUrl: './vrsta-proizvoda.component.html',
  styleUrls: ['./vrsta-proizvoda.component.css']
})
export class VrstaProizvodaComponent implements OnInit {

  korisnik: Korisnik;
  displayedColumns = ['VrstaProizvodaID', 'NazivVrsteProizvoda', 'Actions'];
  dataSource: MatTableDataSource<VrstaProizvoda>;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private korisnikService: KorisnikService, private vrstaProizvodaService: VrstaProizvodaService, 
              private spinner: NgxSpinnerService, private router: Router, public dialog: MatDialog ) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    this.loadData();
  }

  loadData() {
    this.vrstaProizvodaService.getAllVrstaProizvoda().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(flag: number, VrstaProizvodaID: number, NazivVrsteProizvoda: string) {
    const dialogRef = this.dialog.open(VrstaProizvodaDialogComponent, 
      {data: {VrstaProizvodaID: VrstaProizvodaID, NazivVrsteProizvoda: NazivVrsteProizvoda}
    });
    dialogRef.componentInstance.flag = flag;
  }
  
  Logout() {
    this.spinner.show();
    localStorage.removeItem('token');
    localStorage.setItem('proizvodCena', '0');
    localStorage.removeItem('stavkeporudzbine');
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/signin']);
    }, 999);
  }

}
