import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProdavnicaService } from 'src/app/services/Prodavnica/prodavnica.service';
import { SlikaProdavniceService } from 'src/app/services/SlikaProdavnice/slika-prodavnice.service';
import { MatDialog } from '@angular/material';
import { SlikaProdavniceDialogComponent } from '../dialogs/slika-prodavnice-dialog/slika-prodavnice-dialog.component';
import { ProdavnicaDialogComponent } from '../dialogs/prodavnica-dialog/prodavnica-dialog.component';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.css']
})
export class ProdavnicaComponent implements OnInit {

  korisnik: Korisnik;
  prodavnica: any;
  slika: any;
  constructor(private korisnikService: KorisnikService, private spinner: NgxSpinnerService, private router: Router, 
              private prodavnicaService: ProdavnicaService, private slikaService: SlikaProdavniceService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    this.prodavnicaService.getGradIDProdavnica(localStorage.getItem('gradID')).subscribe((data: any) => {
      this.prodavnica = data;
    });
    this.slikaService.getAllSlikaProdavnice().subscribe((data: any) => {
      this.slika = data;
    });
    if(this.korisnik.TipKorisnika == undefined) {
      this.korisnik.TipKorisnika = 'Gost';
      console.log(this.korisnik.TipKorisnika);
    }
  }

  openDialogSlika() {
    const dialogRef = this.dialog.open(SlikaProdavniceDialogComponent);
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

  Login() {
    this.spinner.show();
    localStorage.removeItem('token');
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/signin']);
    }, 999);
  }

  proizvod(prodavnicaID) {
    this.spinner.show();
    localStorage.setItem('prodavnicaID', prodavnicaID);
    setTimeout(() => {
      this.router.navigate(['/proizvod']);
      this.spinner.hide();
    }, 999);
  }

  openDialog(flag: number, ProdavnicaID: number, NazivProdavnice: string, Kontakt: string, Opis: string,
              Adresa: string, RadnoVreme: string, GradID: number) {

            const dialogRef = this.dialog.open(ProdavnicaDialogComponent,
            {data: {ProdavnicaID: ProdavnicaID, NazivProdavnice: NazivProdavnice, Kontakt: Kontakt, Opis: Opis,
            Adresa: Adresa, RadnoVreme: RadnoVreme, GradID: GradID}
            });
            dialogRef.componentInstance.flag = flag;
  }
}
