import { Component, OnInit, Inject } from '@angular/core';
import { ProizvodService } from 'src/app/services/Proizvod/proizvod.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { inject } from '@angular/core/testing';
import { Proizvod } from 'src/app/models/Proizvod/proizvod';
import { ToastrService } from 'ngx-toastr';
import { VrstaProizvodaService } from 'src/app/services/VrstaProizvoda/vrsta-proizvoda.service';
import { BrendService } from 'src/app/services/Brend/brend.service';
import { ProdavnicaService } from 'src/app/services/Prodavnica/prodavnica.service';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {

  flag: number;
  vrstaProizvoda: any;
  brend: any;
  prodavnica: any;
  constructor(private proizvodService: ProizvodService, private dialogRef: MatDialogRef<ProizvodDialogComponent>, 
             @Inject(MAT_DIALOG_DATA) public data: Proizvod, private toastr: ToastrService,
             private vrstaProizvodaService: VrstaProizvodaService, private brendService: BrendService) { }

  ngOnInit() {
    this.proizvodService.getAllProizvod().subscribe();
    this.vrstaProizvodaService.getAllVrstaProizvoda().subscribe((data: any) => {
      this.vrstaProizvoda = data;
    });
    this.brendService.getAllBrend().subscribe((data: any) => {
      this.brend = data;
    });
    this.prodavnica = localStorage.getItem('prodavnicaID');
  }

  add() {
    this.data.ProizvodID = -1;
    this.data.ProdavnicaID = this.prodavnica;
    this.proizvodService.addProizvod(this.data);
    this.toastr.success('Uspesno dodat proizvod', 'Proizvod');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  update() {
    this.proizvodService.updateProizvod(this.data.ProizvodID, this.data);
    this.toastr.success('Uspesno ste modifikovali proizvod', 'Proizvod');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  delete() {
    console.log(this.data.ProizvodID);
    this.proizvodService.deleteProizvod(this.data.ProizvodID);
    this.toastr.success('Uspesno ste obrisali', 'Proizvod');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }

}
