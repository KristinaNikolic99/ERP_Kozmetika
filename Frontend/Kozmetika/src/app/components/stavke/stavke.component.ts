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
import { StripeService } from 'src/app/services/Stripe/stripe.service';

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
  handler: any = null;
  constructor(private stavkaPorudzbineService: StavkaPorudzbineService, private proizvodService: ProizvodService,
              private porudzbinaService: PorudzbinaService, private korisnikService: KorisnikService,
              private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router,
              private stripeService: StripeService) { }

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
    this.loadStripe();
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

  addPorudzbina(komentar: string, tipPlacanja: string) {
    this.porudzbina = new Porudzbina;
    this.porudzbina.PorudzbinaID = -1;
    this.porudzbina.CenaPorudzbine = this.proizvodCena;
    if(tipPlacanja == "Gotovina") {
      this.porudzbina.Isplata = false;
      this.porudzbina.Zahtev = false;
    }
    else if(tipPlacanja == "Kartica") {
      this.porudzbina.Isplata = true;
      this.porudzbina.Zahtev = true;
    }
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

  pay(amount: any, komentar: string, tipPlacanja: string) {
    if(tipPlacanja == undefined)
    {
      this.toastr.error("Potrebno je da odaberete nacin placanja");
      return;
    }
    if(tipPlacanja == "Gotovina")
    {
      this.addPorudzbina(komentar, tipPlacanja);
      return;
    }
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L8LnFCNYvKNBZ1T0oY8kKgUZyhjyDZNEaF84g5XXqfvNfzbpFFEzEF3m8NED4JBa0gNlqF7Dx2NsHbNw0JvEY8v00oUweGQ5x',
      locale: 'auto',
      token: (token: any) => {
        var order = "Porudzbina od strane korisnika " +  this.korisnik.Username + ", email-" + this.korisnik.Email + 
        " je uspesno izvrsena i iznosi " + amount + " dinara";
        this.stripeService.takePayment(order, amount*100, token);
        this.addPorudzbina(komentar, tipPlacanja);
      }
    });
    handler.open({
      name: 'Credit card',
      description: 'Please insert your data',
      currency: 'rsd',
      amount: amount * 100
    });
 
  }

  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L8LnFCNYvKNBZ1T0oY8kKgUZyhjyDZNEaF84g5XXqfvNfzbpFFEzEF3m8NED4JBa0gNlqF7Dx2NsHbNw0JvEY8v00oUweGQ5x',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

}
