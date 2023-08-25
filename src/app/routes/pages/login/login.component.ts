import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdleService } from 'src/app/core/idle/idle.services';
import {CookieService} from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
const YES = 'Yes'
const NO = 'No'
const LOGIN = 'login'
const RECOVER = 'recover'

@Injectable({
    providedIn: 'root'
  })
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    formHasBuilded:boolean = false;
    valForm: FormGroup;
    valFormRecover: FormGroup;
    showPassword: boolean;
    remember: boolean;
    currentAction: string;

    constructor(
        private authService: AuthService, 
        public settings: SettingsService, 
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private idleService: IdleService,
        private cookieService:CookieService,
        private route: ActivatedRoute
    ) {
        this.route.snapshot.url[0].path == RECOVER ? 
            this.currentAction = RECOVER : 
            this.currentAction = LOGIN
        this.builderForm();
        if(this.currentAction === LOGIN && cookieService.get('remember') !== undefined) {
            if(cookieService.get('remember') === YES) {
                this.valForm.get('email')?.setValue(cookieService.get('email'));
                this.valForm.get('password')?.setValue(cookieService.get('password'));
                this.valForm.get('remember')?.setValue(true);
            }
        }    
    }

    
    ngOnInit() {
        if (this.idleService.timedOut) {
            this.idleService.timedOut = false;
            this.toastr.warning('Sua sessão expirou. Por favor, faça login novamente.', 'Sessão Expirada', { closeButton: true });
        }
        
    }

    submitForm() {
        switch(this.currentAction) {
            case LOGIN: 
                this.login()
            break;
            case RECOVER: 
            break;
        }
    }

    builderForm() {
        if(this.currentAction === LOGIN) {
            this.valForm = this.fb.group({
                'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
                'password': [null, Validators.required],
                'remember': [this.remember, []]
            });
        } else {
            this.valFormRecover =  this.fb.group({
                'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
            });
        }
        this.formHasBuilded = true;
    }

    showPasswordField() {
        this.showPassword = !this.showPassword;
    }

    private setRememberMe() {
        var remember = this.valForm.get('remember')?.value;
        if(remember) {
            this.cookieService.set('remember', YES);
            this.cookieService.set('email', this.valForm.get('email')?.value);
            this.cookieService.set('password', this.valForm.get('password')?.value);            
        } else {
            this.cookieService.set('remember', NO);
            this.cookieService.set('email', '');
            this.cookieService.set('password', '');  
        }
      
    }

    private login() {
        if (this.valForm.valid) {
            const email: string = this.valForm.get('email')?.value;
            const password: string = this.valForm.get('password')?.value;

            this.authService
                .authenticate(email, password)
                .subscribe(
                    success => {
                        this.setRememberMe();
                        this.router.navigate(['/home']);
                    }, 
                    error => {
                        this.toastr.error('', 'Login ou senha inválidos', { positionClass: 'toast-bottom-center' });
                        this.valForm.reset();
                    }
                )
        }
    }
}
