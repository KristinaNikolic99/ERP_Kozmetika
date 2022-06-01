import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StavkaPorudzbine } from 'src/app/models/StavkaPorudzbine/stavka-porudzbine';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  readonly root =  'https://localhost:44302/api';
  constructor(private http: HttpClient) { }

  getAllStavkaPorudzbine(): Observable<StavkaPorudzbine[]> {
    return this.http.get<StavkaPorudzbine[]>(this.root + '/StavkaPorudzbine');
  }

  getStavkaPorudzbineID(porudzbina: number): Observable<StavkaPorudzbine[]> {
    return this.http.get<StavkaPorudzbine[]>(this.root + '/StavkePorudzbine/' + porudzbina);
  }

  addStavkePorudzbine(stavkePorudzbina: StavkaPorudzbine[]) {
    this.http.post(this.root + '/StavkePorudzbine', stavkePorudzbina).subscribe();
  }
}
