import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Prodavnica } from 'src/app/models/Prodavnica/prodavnica';

@Injectable({
  providedIn: 'root'
})
export class ProdavnicaService {

  readonly root = 'https://localhost:44302/api/Prodavnica';
  constructor(private http: HttpClient) { }

  getGradIDProdavnica(gradID) {
    return this.http.get(this.root + '/grad/' + gradID, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }

  getAllProdavnica() {
    return this.http.get(this.root);
  }

  addProdavnica(prodavnica: Prodavnica) {
    this.http.post(this.root, prodavnica).subscribe();
  }

  updateProdavnica(id: number, prodavnica: Prodavnica) {
    this.http.put(this.root + '/' + id, prodavnica).subscribe();
  }

  deleteProdavnica(id: number) {
    this.http.delete(this.root + '/' + id).subscribe();
  }
}
