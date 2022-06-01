import { Component, OnInit } from '@angular/core';
import { SlikaProizvoda } from 'src/app/models/SlikaProizvoda/slika-proizvoda';
import { SlikaProizvodaService } from 'src/app/services/SlikaProizvoda/slika-proizvoda.service';
import { ToastrService } from 'ngx-toastr';
import { ProizvodService } from 'src/app/services/Proizvod/proizvod.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-slika-proizvoda-dialog',
  templateUrl: './slika-proizvoda-dialog.component.html',
  styleUrls: ['./slika-proizvoda-dialog.component.css']
})
export class SlikaProizvodaDialogComponent implements OnInit {

  proizvod: any;
  slika: SlikaProizvoda;
  constructor(private slikaProizvodaService: SlikaProizvodaService, 
              private dialogRef: MatDialogRef<SlikaProizvodaDialogComponent>,
              private toastr: ToastrService, private proizvodService: ProizvodService) { }

  ngOnInit() {
    this.proizvodService.getAllProizvod().subscribe((data: any) => {
      this.proizvod = data;
    });
  }

  add(form: NgForm) {
    this.slika = form.value;
    this.slika.Putanja = this.slika.Putanja.substring(12, 99);
    console.log(this.slika);
    this.slikaProizvodaService.addSlikaProizvoda(this.slika);
    this.toastr.success('Uspesno ste dodali sliku proizvoda', 'SlikaProizvoda');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }
}
