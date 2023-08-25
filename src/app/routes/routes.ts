import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { Error403Component } from './pages/error403/error403.component';
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard], data: {claim: null} }
        ]   
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    { path: 'recover', component: LoginComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
    { path: '403', component: Error403Component },
    // Not found
    { path: '**', redirectTo: 'home' }
];
