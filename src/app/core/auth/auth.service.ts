import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { HttpServiceBase } from '../http-service/http-service-base';
import { ResponseModel } from '../http-service/model/response-model';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from './user/user.service';
import { UserToken } from './user/user';
import { IdleService } from '../idle/idle.services';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpServiceBase {
  constructor(
    http: HttpClient, 
    configService: ConfigService,
    private userService: UserService,
    private idleService: IdleService) {
    super(http, configService.getConfiguration().apiURl);
  }
  
  public authenticate(email: string, password: string) {
    const body = {
      email,
      password
    }  
    return this.post('api/v1/auth/token', body).pipe(
      tap((resp) => {
        const authToken = (resp as ResponseModel)?.result?.accessToken;
        const userToken = (resp as ResponseModel)?.result?.userToken as UserToken;
        this.userService.saveToken(authToken);
        this.userService.setUser(userToken);
        this.idleService.start();
      }),
      catchError((error) => { 
        this.idleService.stop();
        return throwError(error); 
      })
    )  
  }
}
