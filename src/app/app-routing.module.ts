import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { RegisterComponent } from './components/register/register.component'; // <= novo import
import { LoginComponent } from './components/login/login.component'; // <= novo import

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'modal',
    component: ModalComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
