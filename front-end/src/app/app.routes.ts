import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { MedicineComponent } from './dashboard-components/medicine-details/medicine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './dashboard-components/order-details/order.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './dashboard-components/user-details/user.component';
import { UserFormComponent } from './dashboard-forms/user-form/user-form.component';
import { OrderFormComponent } from './dashboard-forms/order-form/order-form.component';
import { MedicineFormComponent } from './dashboard-forms/medicine-form/medicine-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: SignInComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'user-details', component: UserComponent },
   { path: 'user-form', component: UserFormComponent },
   { path: 'medicine-details/:id', component: MedicineComponent },
   { path: 'medicine-form', component: MedicineFormComponent },
   { path: 'order-details/:id', component: OrderComponent },
   { path: 'order-form', component: OrderFormComponent }
 //{ path: 'header', component: HeaderComponent },
 //{ path: 'footer', component: FooterComponent },
];