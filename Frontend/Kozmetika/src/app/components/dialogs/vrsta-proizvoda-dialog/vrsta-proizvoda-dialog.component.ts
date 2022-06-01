import { Component, OnInit, Inject } from '@angular/core';
import { VrstaProizvodaService } from 'src/app/services/VrstaProizvoda/vrsta-proizvoda.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VrstaProizvoda } from 'src/app/models/VrstaProizvoda/vrsta-proizvoda';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vrsta-proizvoda-dialog',
  templateUrl: './vrsta-proizvoda-dialog.component.html',
  styleUrls: ['./vrsta-proizvoda-dialog.component.css']
})
export class VrstaProizvodaDialogComponent implements OnInit {

  flag: number;
  constructor(private vrstaProizvodaService: VrstaProizvodaService, private dialogRef: MatDialogRef<VrstaProizvodaDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: VrstaProizvoda, private toastr: ToastrService, 
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.vrstaProizvodaService.getAllVrstaProizvoda().subscribe();
  }

  add() {
    this.data.VrstaProizvodaID = -1;
    this.vrstaProizvodaService.addVrstaProizvoda(this.data);
    this.toastr.success('Uspesno dodata vrsta proizvoda', 'VrstaProizvoda');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  update() {
    console.log(this.data.VrstaProizvodaID);
    this.vrstaProizvodaService.updateVrstaProizvoda(this.data.VrstaProizvodaID, this.data);
    this.toastr.success('Uspesno ste modifikovali vrstu proizvoda', 'VrstaProizvoda');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  delete() {
    console.log(this.data.VrstaProizvodaID);
    this.vrstaProizvodaService.deleteVrstaProizvoda(this.data.VrstaProizvodaID);
    this.toastr.success('Uspesno ste obrisali vrstu proizvoda', 'VrstaProizvoda');
    setTimeout(() => {
      window.location.reload();
    }, 999);
  }

  cancle() {
    this.dialogRef.close();
  }

}
