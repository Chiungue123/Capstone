import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { MedicineComponent } from './medicine/medicine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


export const routes: Routes = [
   { path: 'login', component: SignInComponent },
   { path: 'medicine', component: MedicineComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'order', component: OrderComponent },
    //{ path: 'header', component: HeaderComponent },
    //{ path: 'footer', component: FooterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];