import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StavkaPorudzbine } from 'src/app/models/StavkaPorudzbine/stavka-porudzbine';
import { StavkaPorudzbineService } from 'src/app/services/StavkaPorudzbine/stavka-porudzbine.service';
import { ProizvodService } from 'src/app/services/Proizvod/proizvod.service';
import { ProdavnicaService } from 'src/app/services/Prodavnica/prodavnica.service';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {

  korisnik: Korisnik;
  porudzbina: number;
  proizvod: any;
  prodavnica: any;
  displayedColumns = ['StavkaPorudzbineID', 'ProizvodID', 'NazivProizvoda', 'Cena', 'KolicinaProizvoda', 'Prodavnica'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private stavkaPorudzbineService: StavkaPorudzbineService, private proizvodService: ProizvodService,
              private prodavnicaService: ProdavnicaService, private korisnikService: KorisnikService,
              private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    this.porudzbina = parseInt(localStorage.getItem('stavkaporudzbine'));
    this.proizvodService.getAllProizvod().subscribe((data: any) => {
      this.proizvod = data;
    });
    this.prodavnicaService.getAllProdavnica().subscribe((data: any) => {
      this.prodavnica = data;
    });
    this.loadData();
  }

  loadData() {
    console.log(this.porudzbina);
    this.stavkaPorudzbineService.getStavkaPorudzbineID(this.porudzbina).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
