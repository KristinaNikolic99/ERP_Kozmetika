import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Auth/auth.guard';
import { ProdavnicaComponent } from './components/prodavnica/prodavnica.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { VrstaProizvodaComponent } from './components/vrsta-proizvoda/vrsta-proizvoda.component';
import { StavkaPorudzbineComponent } from './components/stavka-porudzbine/stavka-porudzbine.component';
import { StavkeComponent } from './components/stavke/stavke.component';


const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'prodavnica', component: ProdavnicaComponent, canActivate: [AuthGuard]},
  {path: 'proizvod', component: ProizvodComponent, canActivate: [AuthGuard]},
  {path: 'korisnici', component: KorisniciComponent, canActivate: [AuthGuard]},
  {path: 'porudzbina', component: PorudzbinaComponent, canActivate: [AuthGuard]},
  {path: 'vrstaProizvoda', component: VrstaProizvodaComponent, canActivate: [AuthGuard]},
  {path: 'stavkaPorudzbine', component: StavkaPorudzbineComponent, canActivate: [AuthGuard]},
  {path: 'stavke', component: StavkeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
