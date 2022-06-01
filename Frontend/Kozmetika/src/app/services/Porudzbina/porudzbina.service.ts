import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Porudzbina } from 'src/app/models/Porudzbina/porudzbina';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  readonly root = 'https://localhost:44302/api/Porudzbina';
  constructor(private http: HttpClient) { }

  getAllPorudzbina(): Observable<Porudzbina[]> {
    return this.http.get<Porudzbina[]>(this.root);
  }

  getPorudzbinaLast() {
    return this.http.get(this.root + '/last');
  }

  getPorudzbinaKorisnikTrue(korisnik: number): Observable<Porudzbina[]> {
    return this.http.get<Porudzbina[]>(this.root + '/zahtevTrue/' + korisnik);
  }

  getPorudzbinaKorisnikFalse(korisnik: number): Observable<Porudzbina[]> {
    return this.http.get<Porudzbina[]>(this.root + '/zahtevFalse/' + korisnik);
  }

  addPorudzbina(porudzbina: Porudzbina) {
    this.http.post(this.root, porudzbina).subscribe();
  }

  updatePorudzbina(id: number, porudzbina: Porudzbina) {
    this.http.put(this.root + '/' + id, porudzbina).subscribe();
  }

  deletePorudzbina(id: number) {
    this.http.delete(this.root + '/' + id).subscribe();
  }

}
