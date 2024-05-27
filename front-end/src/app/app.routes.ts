import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { MedicineComponent } from './dashboard-components/medicine-details/medicine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './dashboard-components/order-details/order.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './dashboard-components/user-details/user.component';
import { SymptomDetailsComponent } from './dashboard-components/symptom-details/symptom-details.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: SignInComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'user-details', component: UserComponent },
   { path: 'medicine-details', component: MedicineComponent },
   { path: 'order-details', component: OrderComponent },
   { path: 'symptom-details', component: SymptomDetailsComponent },
 //{ path: 'header', component: HeaderComponent },
 //{ path: 'footer', component: FooterComponent },
];