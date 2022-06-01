import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError = false;
  korisnik: Korisnik;
  hide = true;
  constructor(private korisnikService: KorisnikService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
  }

  signUp() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/signup']);
    }, 999)
  }

  onSubmit(username, password) {
    this.isLoginError = false;
    if(username === '' || password === '') {
      this.isLoginError = true;
      return;
    }
    this.spinner.show();
    this.korisnikService.userAuthentication(username, password).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
      this.korisnikService.getKorisnikClaims().subscribe((data: any) => {
        this.korisnik = data; 
      });
      setTimeout(() => {
        this.spinner.hide();
        if(this.korisnik.TipKorisnika === 'Administrator') {
          this.router.navigate(['/home']);
        } else if(this.korisnik.TipKorisnika === 'Kupac') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/signup']);
        }
      }, 1999);
    },
    (err: HttpErrorResponse) => {
      this.spinner.hide();
      this.isLoginError = true;
    });
  }
  

}
