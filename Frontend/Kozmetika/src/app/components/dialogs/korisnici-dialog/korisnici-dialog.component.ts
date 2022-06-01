import { Component, OnInit, Inject } from '@angular/core';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Korisnik } from 'src/app/models/Korisnik/korisnik';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-korisnici-dialog',
  templateUrl: './korisnici-dialog.component.html',
  styleUrls: ['./korisnici-dialog.component.css']
})
export class KorisniciDialogComponent implements OnInit {

  flag: number;
  constructor(private korisnikService: KorisnikService, private dialogRef: MatDialogRef<KorisniciDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Korisnik, private toastr: ToastrService) { }

  ngOnInit() {
    this.korisnikService.getAllKorisnik().subscribe();
  }

  add() {
    this.data.KorisnikID = -1;
    this.korisnikService.addKorisnik(this.data);
    this.toastr.success('Uspesno dodat korisnik', 'Korisnik');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  update() {
    this.korisnikService.updateKorisnik(this.data.KorisnikID, this.data);
    this.toastr.success('Uspesno ste modifikovali korisnika', 'Korisnik');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  delete(): void {
    console.log(this.data.KorisnikID);
    this.korisnikService.deleteKorisnik(this.data.KorisnikID);
    this.toastr.success('Uspesno ste obrisali korisnika', 'Korisnik');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }

}
