import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProizvodService } from 'src/app/services/Proizvod/proizvod.service';
import { SlikaProizvodaService } from 'src/app/services/SlikaProizvoda/slika-proizvoda.service';
import { MatDialog } from '@angular/material';
import { SlikaProizvodaDialogComponent } from '../dialogs/slika-proizvoda-dialog/slika-proizvoda-dialog.component';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';
import { StavkaPorudzbine } from 'src/app/models/StavkaPorudzbine/stavka-porudzbine';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {

  korisnik: Korisnik;
  proizvod: any;
  slika: any;
  stavke: StavkaPorudzbine[] = [];
  stavka: StavkaPorudzbine;
  proizvodCena: number;
  constructor(private korisnikService: KorisnikService, private spinner: NgxSpinnerService, private router: Router, 
              private proizvodService: ProizvodService, private slikaService: SlikaProizvodaService,
              public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });

    this.proizvodService.getProdavnicaIDProizvod(localStorage.getItem('prodavnicaID')).subscribe((data: any) => {
      this.proizvod = data;
    });

    this.slikaService.getAllSlikaProizvoda().subscribe((data: any) => {
      this.slika = data;
    });
    
    this.proizvodCena = 0;

    if(this.korisnik.TipKorisnika == undefined) {
      this.korisnik.TipKorisnika = 'Gost';
      console.log(this.korisnik.TipKorisnika);
    }
  }

  openDialogSlika() {
    const dialogRef = this.dialog.open(SlikaProizvodaDialogComponent);
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
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/signin']);
    }, 999);
  }

  openDialog(flag: number, ProizvodID: number, NazivProizvoda: string, Cena: number, Opis: string, OcenaProizvoda: number, 
             VrstaProizvodaID: number, BrendID: number, ProdavnicaID: number) {

              const dialogRef = this.dialog.open(ProizvodDialogComponent, 
              {data: {ProizvodID: ProizvodID, NazivProizvoda: NazivProizvoda, Cena: Cena, Opis: Opis, 
              OcenaProizvoda: OcenaProizvoda, VrstaProizvodaID: VrstaProizvodaID, BrendID: BrendID, ProdavnicaID: ProdavnicaID}
              });
            dialogRef.componentInstance.flag = flag;
   }

   addStavke(proizvod: number, cena: number, kolicina: number) {
    if (localStorage.getItem('proizvodCena') != null) {
      this.proizvodCena = parseInt(localStorage.getItem('proizvodCena'));
    }
    if (localStorage.getItem('stavkeporudzbine') != null) {
      this.stavke = JSON.parse(localStorage.getItem('stavkeporudzbine'));
    }
    this.stavka = new StavkaPorudzbine;
    this.stavka.StavkaPorudzbineID = 1;
    this.stavka.KolicinaProizvoda = kolicina;
    this.stavka.ProizvodID = proizvod;
    this.proizvodCena = this.proizvodCena + (cena * kolicina);
    this.stavke.push(this.stavka);
    localStorage.setItem('proizvodCena', this.proizvodCena.toString());
    console.log(localStorage.getItem('proizvodCena'));
    localStorage.setItem('stavkeporudzbine', JSON.stringify(this.stavke));
    this.toastr.success('Uspesno ste dodali proizvod', 'StavkaPorudzbine');
   }
  
   stavkeKupac() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['stavke']);
    }, 999);
   }

}
