import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradService {

  readonly root = 'https://localhost:44302/api/Grad';
  constructor(private http: HttpClient) { }

  getAllGrad() {
    return this.http.get(this.root,  {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }
}
