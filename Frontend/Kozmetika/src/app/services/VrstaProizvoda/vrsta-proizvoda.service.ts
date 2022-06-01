import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VrstaProizvoda } from 'src/app/models/VrstaProizvoda/vrsta-proizvoda';

@Injectable({
  providedIn: 'root'
})
export class VrstaProizvodaService {

  readonly root = 'https://localhost:44302/api/VrstaProizvoda';
  constructor(private http: HttpClient) { }

  getAllVrstaProizvoda(): Observable<VrstaProizvoda[]> {
    return this.http.get<VrstaProizvoda[]>(this.root);
  }

  addVrstaProizvoda(vrstaProizvoda: VrstaProizvoda) {
    this.http.post(this.root, vrstaProizvoda).subscribe();
  }

  updateVrstaProizvoda(id: number, vrstaProizvoda: VrstaProizvoda) {
    this.http.put(this.root + '/' + id, vrstaProizvoda).subscribe();
  }

  deleteVrstaProizvoda(id: number) {
    this.http.delete(this.root + '/' + id).subscribe();
  }
}
