import { Component, OnInit, Inject } from '@angular/core';
import { PorudzbinaService } from 'src/app/services/Porudzbina/porudzbina.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Porudzbina } from 'src/app/models/Porudzbina/porudzbina';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { KorisnikService } from 'src/app/services/Korisnik/korisnik.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  flag: number;
  korisnik: any;
  constructor(private porudzbinaService: PorudzbinaService, private dialogRef: MatDialogRef<PorudzbinaDialogComponent>, 
             @Inject(MAT_DIALOG_DATA) public data: Porudzbina, private toastr: ToastrService, 
             private spinner: NgxSpinnerService, private korisnikService: KorisnikService) { }

  ngOnInit() {
    this.porudzbinaService.getAllPorudzbina().subscribe();
    this.korisnikService.getAllKorisnik().subscribe((data: any) => {
      this.korisnik = data;
    });
  }

  add() {
    this.data.PorudzbinaID = -1;
    if (this.data.Isplata === undefined) {
      this.data.Isplata = false;
    }
    if (this.data.Zahtev === undefined) {
      this.data.Zahtev = false;
    }
    this.porudzbinaService.addPorudzbina(this.data);
    this.toastr.success('Uspesno dodata porudzbina', 'Porudzbina');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  update() {
    this.porudzbinaService.updatePorudzbina(this.data.PorudzbinaID, this.data);
    this.toastr.success('Uspesno ste modifikovali porudzbinu', 'Porudzbina');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  delete() {
    console.log(this.data.PorudzbinaID);
    this.porudzbinaService.deletePorudzbina(this.data.PorudzbinaID);
    this.toastr.success('Uspesno ste obrisali porudzbinu', 'Porudzbina');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }

}
