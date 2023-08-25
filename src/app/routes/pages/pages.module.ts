


import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule }   from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { JwtHelperService } from 'src/app/core/jwt/jwt-helper.service';
import { Error403Component } from './error403/error403.component';
/* Use this routes definition in case you want to make them lazy-loaded */
/*const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
];*/

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        QRCodeModule
    ],
    declarations: [
        LoginComponent,
        MaintenanceComponent,
        Error404Component,
        Error500Component,
        Error403Component,
    ],
    exports: [
        RouterModule,
        LoginComponent,
        MaintenanceComponent,
        Error404Component,
        Error500Component,
    ],
    providers: [
        JwtHelperService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
