import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlikaProdavnice } from 'src/app/models/SlikaProdavnice/slika-prodavnice';

@Injectable({
  providedIn: 'root'
})
export class SlikaProdavniceService {

  readonly root = 'https://localhost:44302/api/SlikaProdavnice';
  constructor(private http: HttpClient) { }

  getAllSlikaProdavnice() {
    return this.http.get(this.root);
  }

  getProdavnicaIdSlikaProdavnice(prodavnicaID) {
    return this.http.get(this.root + '/prodavnica/' + prodavnicaID)
  }

  addSlikaProdavnice(slika: SlikaProdavnice) {
    this.http.post(this.root, slika).subscribe();
  }
}
