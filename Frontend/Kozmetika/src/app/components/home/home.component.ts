import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GradService } from 'src/app/services/Grad/grad.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  korisnik: Korisnik;
  grad: any;
  constructor(private korisnikService: KorisnikService, private spinner: NgxSpinnerService, private router: Router, 
              private gradService: GradService) { }

  ngOnInit() {
    this.korisnik = new Korisnik;
    this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
      this.korisnik = data;
    });
    this.gradService.getAllGrad().subscribe((data: any) => {
      this.grad = data;
    });
    if(this.korisnik.TipKorisnika == undefined) {
      this.korisnik.TipKorisnika = 'Gost';
      console.log(this.korisnik.TipKorisnika);
      console.log(localStorage.getItem('token'));
    }
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

  prodavnica(gradID) {
    this.spinner.show();
    localStorage.setItem('gradID', gradID);
    setTimeout(() => {
      this.router.navigate(['/prodavnica']);
      this.spinner.hide();
    }, 999);
  }

  korisnici() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/korisnici']);
      this.spinner.hide();
    }, 999);
  }

  porudzbina() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/porudzbina']);
      this.spinner.hide();
    }, 999);
  }

  vrstaProizvoda() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/vrstaProizvoda']);
      this.spinner.hide();
    }, 999);
  }

}
