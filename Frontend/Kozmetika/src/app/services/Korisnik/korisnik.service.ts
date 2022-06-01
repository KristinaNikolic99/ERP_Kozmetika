import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';


@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  readonly root = 'https://localhost:44302';
  constructor(private http: HttpClient) { }

  userAuthentication(username, password) {
    // tslint:disable-next-line:no-var-keyword
    var data = 'username=' + username + '&password=' + password + '&grant_type=password';
    // tslint:disable-next-line: no-var-keyword
    var reqHeader = new HttpHeaders({'Content-type': 'application/x-www/urlencoded', 'No-Auth': 'True'});
    return this.http.post(this.root + '/token', data, {headers: reqHeader});
  }

  getKorisnikClaims() {
    return this.http.get(this.root + '/api/GetKorisnik', {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }

  postKorisnik(form) {
    return this.http.post(this.root + '/api/Korisnik', form);
  }

  getAllKorisnik(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.root + '/api/Korisnik');
  }

  addKorisnik(korisnik: Korisnik) {
    this.http.post(this.root + '/api/Korisnik', korisnik).subscribe();
  }

  updateKorisnik(id: number, korisnik: Korisnik) {
     this.http.put(this.root + '/api/Korisnik/' + id, korisnik).subscribe();
  }

  deleteKorisnik(id: any): void {
     this.http.delete(this.root + '/api/Korisnik/' + id).subscribe();
  }
}
