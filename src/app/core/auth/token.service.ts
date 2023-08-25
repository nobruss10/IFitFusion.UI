import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '../jwt/jwt-helper.service';

const KEY = 'ifitFusionToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    changeValue$: Observable<any>;
    private changeValueSubject = new Subject<boolean>();

    constructor(private jwtService: JwtHelperService) {
      this.changeValue$ = this.changeValueSubject.asObservable();
    }

    getToken(): string | null {
      return localStorage.getItem(KEY)
    }

    saveToken(token: string) {
      localStorage.setItem(KEY, token);
    }

    removeToken() {
      localStorage.removeItem(KEY); 
    }

    hasToken() {
      return !!this.getToken();
    }

    RemoveExpiredToken() {
      if(this.jwtService.isTokenExpired(this.getToken() ?? "")) {
        this.removeToken();
        this.changeValueSubject.next(true);
      }
    }
}
