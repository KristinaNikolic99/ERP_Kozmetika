import { Component, OnInit, Inject } from '@angular/core';
import { ProdavnicaService } from 'src/app/services/Prodavnica/prodavnica.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Prodavnica } from 'src/app/models/Prodavnica/prodavnica';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GradService } from 'src/app/services/Grad/grad.service';

@Component({
  selector: 'app-prodavnica-dialog',
  templateUrl: './prodavnica-dialog.component.html',
  styleUrls: ['./prodavnica-dialog.component.css']
})
export class ProdavnicaDialogComponent implements OnInit {

  flag: number;
  grad: any;
  constructor(private prodavnicaService: ProdavnicaService, private dialogRef: MatDialogRef<ProdavnicaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Prodavnica, private toastr: ToastrService) { }

  ngOnInit() {
    this.prodavnicaService.getAllProdavnica().subscribe();
    this.grad = localStorage.getItem('gradID');
  }

  add() {
    this.data.ProdavnicaID = -1;
    this.data.GradID = this.grad;
    this.prodavnicaService.addProdavnica(this.data);
    this.toastr.success('Uspesno dodata prodavnica', 'Prodanica');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  update() {
    this.prodavnicaService.updateProdavnica(this.data.ProdavnicaID, this.data);
    this.toastr.success('Uspesno ste modifikovali prodavnicu', 'Prodavnica');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  delete() {
    console.log(this.data.ProdavnicaID);
    this.prodavnicaService.deleteProdavnica(this.data.ProdavnicaID);
    this.toastr.success('Uspesno ste obrisali prodavnicu', 'Prodavnica');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }
}
