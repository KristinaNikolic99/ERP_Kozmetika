import { Component, OnInit, ViewChild } from '@angular/core';
import { StavkaPorudzbine } from 'src/app/models/StavkaPorudzbine/stavka-porudzbine';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StavkaPorudzbineService } from 'src/app/services/StavkaPorudzbine/stavka-porudzbine.service';
import { ProizvodService } from 'src/app/services/Proizvod/proizvod.service';
import { PorudzbinaService } from 'src/app/services/Porudzbina/porudzbina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Porudzbina } from 'src/app/models/Porudzbina/porudzbina';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';

@Component({
  selector: 'app-stavke',
  templateUrl: './stavke.component.html',
  styleUrls: ['./stavke.component.css']
})
export class StavkeComponent implements OnInit {

  korisnik: Korisnik;
  stavke: StavkaPorudzbine[];
  proizvodCena: number;
  cena: any;
  proizvod: any;
  porudzbina: Porudzbina;
  porudzbinaLast: number;
  displayedColumns = ['ProizvodID', 'NazivProizvoda', 'Opis', 'Cena', 'KolicinaProizvoda', 'Actions'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private stavkaPorudzbineService: StavkaPorudzbineService, private proizvodService: ProizvodService,
              private porudzbinaService: PorudzbinaService, private korisnikService: KorisnikService,
              private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    this.proizvodCena = parseInt(localStorage.getItem('proizvodCena'));
    console.log(this.proizvodCena);
    this.stavke = JSON.parse(localStorage.getItem('stavkeporudzbine'));
    this.proizvodService.getAllProizvod().subscribe((data: any) => {
      this.proizvod = data;
    });
    this.loadData();
  }

  loadData() {
    this.dataSource = new MatTableDataSource(this.stavke);
    this.dataSource.sort = this.sort;
  }

  delete(proizvods: number, kolicina: number) {
    for (let p of this.proizvod) {
      if(p.ProizvodID === proizvods) {
        this.cena = p.Cena;
      }
    }
    for (let s of this.stavke) {
      if(s.ProizvodID === proizvods && s.KolicinaProizvoda === kolicina) {
        const index = this.stavke.indexOf(s, 0);
        this.stavke.splice(index, 1);
        this.proizvodCena = this.proizvodCena - (this.cena * kolicina);
        localStorage.setItem('proizvodCena', this.proizvodCena.toString());
        localStorage.setItem('stavkeporudzbine', JSON.stringify(this.stavke));
        this.loadData();
      }
    }
  }

  addPorudzbina(komentar: string) {
    this.porudzbina = new Porudzbina;
    this.porudzbina.PorudzbinaID = -1;
    this.porudzbina.CenaPorudzbine = this.proizvodCena;
    this.porudzbina.Isplata = false;
    this.porudzbina.Zahtev = false;
    this.porudzbina.Komentar = komentar;
    this.porudzbina.KorisnikID = this.korisnik.KorisnikID;
    this.porudzbinaService.addPorudzbina(this.porudzbina);
    this.toastr.success('Uspesno ste dodali porudzbinu', 'Porudzbina');
    this.spinner.show();

    setTimeout(() => {
      this.porudzbinaService.getPorudzbinaLast().subscribe((data: any) => {
        this.porudzbinaLast = data;
      });
    }, 4999);

    setTimeout(() => {
      console.log(this.porudzbinaLast);
      for(let s of this.stavke) {
        s.PorudzbinaID = this.porudzbinaLast;
      }
    }, 7999);

    setTimeout(() => {
      this.stavkaPorudzbineService.addStavkePorudzbine(this.stavke);
    }, 9999);

    setTimeout(() => {
      localStorage.removeItem('stavkeporudzbine');
      localStorage.setItem('proizvodCena', '0');
    }, 10999);

    
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['porudzbina']);
    }, 14999);
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
