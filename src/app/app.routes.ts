import { Routes } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '',      component: HomeComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent }
];
