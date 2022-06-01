import { Component, OnInit } from '@angular/core';
import { SlikaProdavnice } from 'src/app/models/SlikaProdavnice/slika-prodavnice';
import { SlikaProdavniceService } from 'src/app/services/SlikaProdavnice/slika-prodavnice.service';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ProdavnicaService } from 'src/app/services/Prodavnica/prodavnica.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-slika-prodavnice-dialog',
  templateUrl: './slika-prodavnice-dialog.component.html',
  styleUrls: ['./slika-prodavnice-dialog.component.css']
})
export class SlikaProdavniceDialogComponent implements OnInit {

  prodavnica: any;
  slika: SlikaProdavnice;
  constructor(private slikaProdavniceService: SlikaProdavniceService, 
              private dialogRef: MatDialogRef<SlikaProdavniceDialogComponent>, 
              private toastr: ToastrService, private prodavnicaService: ProdavnicaService) { }

  ngOnInit() {
    this.prodavnicaService.getAllProdavnica().subscribe((data: any) => {
      this.prodavnica = data;
    });
  }

  add(form: NgForm) {
    this.slika = form.value;
    this.slika.Putanja = this.slika.Putanja.substring(12, 99);
    console.log(this.slika);
    this.slikaProdavniceService.addSlikaProdavnice(this.slika);
    this.toastr.success('Uspesno ste dodali sliku prodavnice', 'SlikaProdavnice');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }

}
