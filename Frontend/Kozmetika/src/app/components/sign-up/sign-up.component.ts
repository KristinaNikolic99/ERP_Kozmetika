import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLoginError = false;
  isEUError = false;
  korisnik: Korisnik;
  constructor(private korisnikService: KorisnikService, private router: Router, private spinner: NgxSpinnerService, 
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  insertKorisnik(form: NgForm) {
    this.isLoginError = false;
    this.isEUError = false;
    if(form.value.BrojStana === '') {
      form.value.BrojStana = 0;
    }
    this.korisnik = form.value;
    this.korisnik.TipKorisnika = 'Kupac';
    this.korisnik.UkupnoStanjeBodova = 0;
    if(this.korisnik.Ime === '' || this.korisnik.Prezime === '' || this.korisnik.Email === '' || this.korisnik.Kontakt === '' ||
       this.korisnik.Adresa === '' || this.korisnik.Username === '' || this.korisnik.Password === '') {
         this.isLoginError = true;
         return;
    }
    this.korisnikService.postKorisnik(this.korisnik).subscribe(res => {
      this.toastr.success('Account created successfully', 'Korisnik');
      setTimeout(() => {
        this.spinner.show();
      }, 799);
      setTimeout(() => {
        this.spinner.hide();
        this.router.navigate(['/signin']);
      }, 1999);
    },
    (err: HttpErrorResponse) => {
      if(err.status === 500) {
        this.isEUError = true;
        form.resetForm();
        return;
      }
      this.isLoginError = true;
    });
  }

}
