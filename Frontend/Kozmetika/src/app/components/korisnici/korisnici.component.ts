import { Component, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { KorisniciDialogComponent } from '../dialogs/korisnici-dialog/korisnici-dialog.component';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  korisnik: Korisnik;
  displayedColumns = ['KorisnikID', 'TipKorisnika', 'Ime', 'Prezime', 'Email', 'Kontakt', 'Adresa', 'BrojStana', 'Username',
                      'Password', 'UkupnoStanjeBodova', 'Actions'];
  dataSource: MatTableDataSource<Korisnik>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private korisnikService: KorisnikService, private spinner: NgxSpinnerService, private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    this.loadData();
  }

  loadData() {
    this.korisnikService.getAllKorisnik().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(flag: number, KorisnikID: number, TipKorisnika: string, Ime: string, Prezime: string, Email: string, Kontakt: string,
             Adresa: string, BrojStana: number, Username: string, Password: string, UkupnoStanjeBodova: number) {
        const dialogRef = this.dialog.open(KorisniciDialogComponent,
          {data: {KorisnikID: KorisnikID, TipKorisnika: TipKorisnika, Ime: Ime, Prezime: Prezime, Email: Email,
          Kontakt: Kontakt, Adresa: Adresa, BrojStana: BrojStana, Username: Username, Password: Password,
          UkupnoStanjeBodova: UkupnoStanjeBodova}
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
