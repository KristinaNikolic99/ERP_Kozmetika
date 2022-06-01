import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrendService {

  readonly root = 'https://localhost:44302/api/Brend';
  constructor(private http: HttpClient) { }

  getAllBrend() {
    return this.http.get(this.root);
  }
}
