import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlikaProizvoda } from 'src/app/models/SlikaProizvoda/slika-proizvoda';

@Injectable({
  providedIn: 'root'
})
export class SlikaProizvodaService {

  readonly root = 'https://localhost:44302/api/SlikaProizvoda';
  constructor(private http: HttpClient) { }

  getAllSlikaProizvoda() {
    return this.http.get(this.root)
  }

  getProizvodIdSlikaProizvoda(proizvodID) {
    return this.http.get(this.root + '/prizvod/' +proizvodID)
  }

  addSlikaProizvoda(slika: SlikaProizvoda) {
    this.http.post(this.root, slika).subscribe();
  }
}
