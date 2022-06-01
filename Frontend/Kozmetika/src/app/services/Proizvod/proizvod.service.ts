import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proizvod } from 'src/app/models/Proizvod/proizvod';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  readonly root = 'https://localhost:44302/api/Proizvod';
  constructor(private http: HttpClient) { }

  getProdavnicaIDProizvod(prodavnicaID) {
    return this.http.get(this.root + '/prodavnica/' + prodavnicaID);
  }

  getAllProizvod() {
    return this.http.get(this.root);
  }

  addProizvod(proizvod: Proizvod) {
    this.http.post(this.root, proizvod).subscribe();
  }

  updateProizvod(id: number, proizvod: Proizvod) {
    this.http.put(this.root + '/' + id, proizvod).subscribe();
  }

  deleteProizvod(id: number) {
    this.http.delete(this.root + '/' + id).subscribe();
  }
}
