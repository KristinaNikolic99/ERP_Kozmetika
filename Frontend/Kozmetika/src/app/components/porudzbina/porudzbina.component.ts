import { Component, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Porudzbina } from 'src/app/models/Porudzbina/porudzbina';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { PorudzbinaService } from 'src/app/services/Porudzbina/porudzbina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {

  korisnik: Korisnik;
  displayedColumns = ['PorudzbinaID', 'CenaPorudzbine', 'Datum', 'Isplata', 'Zahtev', 'Komentar', 'KorisnikID', 
                      'Detalji', 'Actions'];
  displayedColumnsKupac = ['PorudzbinaID', 'CenaPorudzbine', 'Datum', 'Komentar', 'Detalji'];
  dataSource: MatTableDataSource<Porudzbina>;
  dataSourceTrue: MatTableDataSource<Porudzbina>;
  dataSourceFalse: MatTableDataSource<Porudzbina>;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild('paginator1', null) paginator1: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild('sort1', null) sort1: MatSort;
  constructor(private korisnikService: KorisnikService, private porudzbinaService: PorudzbinaService, 
              private spinner: NgxSpinnerService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    setTimeout(() => {
      console.log(this.korisnik.TipKorisnika);
      if(this.korisnik.TipKorisnika == 'Administrator')
      {
        this.loadData();
      }
      if(this.korisnik.TipKorisnika == 'Kupac')
      {
        this.loadDataTrueFalse();
      }
    }, 999);

  }

  loadData() {
    this.porudzbinaService.getAllPorudzbina().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  loadDataTrueFalse() {
    this.porudzbinaService.getPorudzbinaKorisnikTrue(this.korisnik.KorisnikID).subscribe(data => {
      this.dataSourceTrue = new MatTableDataSource(data);
      this.dataSourceTrue.paginator = this.paginator1;
      this.dataSourceTrue.sort = this.sort1;
    });

    this.porudzbinaService.getPorudzbinaKorisnikFalse(this.korisnik.KorisnikID).subscribe(data => {
      this.dataSourceFalse = new MatTableDataSource(data);
      this.dataSourceFalse.paginator = this.paginator;
      this.dataSourceFalse.sort = this.sort;
    });
  }

  openDialog(flag: number, PorudzbinaID: number, CenaPorudzbine: number, Datum: string, Isplata: boolean, Zahtev: boolean, 
             Komentar: string, KorisnikID: string) {
             const dialogRef = this.dialog.open(PorudzbinaDialogComponent,
             {data: {PorudzbinaID: PorudzbinaID, CenaPorudzbine: CenaPorudzbine, Datum: Datum, Isplata: Isplata, Zahtev: Zahtev, 
             Komentar: Komentar, KorisnikID: KorisnikID}
            });
            dialogRef.componentInstance.flag = flag;

  }

  detalji(porudzbinaID: number) {
    this.spinner.show();
    console.log(porudzbinaID);
    localStorage.setItem('stavkaporudzbine', porudzbinaID.toString());
    console.log(localStorage.getItem('stavkaporudzbine'));
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['stavkaPorudzbine']);
    }, 999);
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
