import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IdleService } from '../../idle/idle.services';
import { TokenService } from '../token.service';
import { User, UserToken } from './user';
import jwt_decore from 'jwt-decode';

const KEY = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({});
  private claims: Array<any> = [];
  private user: User;

  constructor(private tokenService: TokenService,
    private idleService: IdleService,
    private router: Router) {
    this.loadSession();
    this.idleService.onTimeout.subscribe(
      event => {
        this.logout();
      }
    );

    this.tokenService.changeValue$.subscribe(
      event => {
        if (event) {
          idleService.timedOut = true;
          this.logout();
        }
      },
    )
  }

  loadSession() {
    const userToken = this.getUserFromLocalStorage();

    if (userToken) {
      const user = userToken?.user ?? {};

      if (!this.user)
        this.idleService.start()

      this.claims = userToken?.claims ?? [];
      this.user = user;
      this.userSubject.next(this.user);

    } else {
      this.idleService.stop();
    }
  }

  setUser(userToken: UserToken) {
    if (userToken)
      localStorage.setItem(KEY, JSON.stringify(userToken));
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem(KEY)
    this.userSubject.next({});
    this.idleService.stop();
    this.router.navigate(['login']);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  hasClaim(claim: string) {
    return this.claims?.some(c => c?.code == claim);
  }

  changeProfilePicture(photoUrl: string): void {
    const userToken = this.getUserFromLocalStorage() as UserToken;
    if (userToken.user) {
      userToken.user.profilePhotoUrl = photoUrl;
      this.setUser(userToken);
      this.userSubject.next(userToken.user);
    }
  }

  editUserData(user: User): void {
    const userToken = this.getUserFromLocalStorage() as UserToken;
    if (userToken.user) {
      userToken.user.name = user.name;
      userToken.user.birthDate = user.birthDate;
      userToken.user.Weight = user.Weight;
      userToken.user.Active = user.Active;
      userToken.user.Phone = user.Phone;
      userToken.user.Height = user.Height;
      this.setUser(userToken);
      this.userSubject.next(userToken.user);
    }
  }

  getCompanyId() {
    const userLogged = this.decodeJwt() as any;
    return userLogged?.groupsid ?? 0;
  }

  private getUserFromLocalStorage() {
    try {
      const userToken = localStorage.getItem(KEY);
      if (!userToken)
        return null;

      return JSON.parse(userToken) as UserToken;
    } catch {
      console.error("Error trying to get the user.")
      return null;
    }
  }

  private decodeJwt() {
    const token = this.tokenService.getToken() ?? '';
    return jwt_decore(token);
  }
}
