import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
import {MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, MatSidenavModule,
        MatSortModule, MatFormFieldModule, MatMenuModule, MatTableModule, MatDialogModule,
        MatPaginatorModule, MatOptionModule, MatSelectModule, MatCheckboxModule} from '@angular/material';
import {NgxSpinnerModule} from 'ngx-spinner';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { KorisnikService } from './services/Korisnik/korisnik.service';
import { GradService } from './services/Grad/grad.service';
import { ProdavnicaComponent } from './components/prodavnica/prodavnica.component';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { KorisniciDialogComponent } from './components/dialogs/korisnici-dialog/korisnici-dialog.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { PorudzbinaDialogComponent } from './components/dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { VrstaProizvodaComponent } from './components/vrsta-proizvoda/vrsta-proizvoda.component';
import { VrstaProizvodaDialogComponent } from './components/dialogs/vrsta-proizvoda-dialog/vrsta-proizvoda-dialog.component';
import { SlikaProdavniceDialogComponent } from './components/dialogs/slika-prodavnice-dialog/slika-prodavnice-dialog.component';
import { SlikaProizvodaDialogComponent } from './components/dialogs/slika-proizvoda-dialog/slika-proizvoda-dialog.component';
import { ProdavnicaDialogComponent } from './components/dialogs/prodavnica-dialog/prodavnica-dialog.component';
import { ProizvodDialogComponent } from './components/dialogs/proizvod-dialog/proizvod-dialog.component';
import { StavkaPorudzbineComponent } from './components/stavka-porudzbine/stavka-porudzbine.component';
import { StavkeComponent } from './components/stavke/stavke.component'


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProdavnicaComponent,
    ProizvodComponent,
    KorisniciComponent,
    KorisniciDialogComponent,
    PorudzbinaComponent,
    PorudzbinaDialogComponent,
    VrstaProizvodaComponent,
    VrstaProizvodaDialogComponent,
    SlikaProdavniceDialogComponent,
    SlikaProizvodaDialogComponent,
    ProdavnicaDialogComponent,
    ProizvodDialogComponent,
    StavkaPorudzbineComponent,
    StavkeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatSortModule, 
    MatFormFieldModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 1999,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    })
  ],
  entryComponents: [KorisniciDialogComponent, PorudzbinaDialogComponent, VrstaProizvodaDialogComponent,
                    SlikaProdavniceDialogComponent, SlikaProizvodaDialogComponent, ProdavnicaDialogComponent,
                    ProizvodDialogComponent],
  providers: [KorisnikService, GradService],
  bootstrap: [AppComponent]
})
export class AppModule { }
