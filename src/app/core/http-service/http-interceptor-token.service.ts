import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenService } from '../auth/token.service';

@Injectable()
export class HttpInterceptorTokenService implements HttpInterceptor {

    constructor(private tokenService: TokenService, private router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if(this.tokenService.hasToken()) {
          const token = this.tokenService.getToken();

          request = request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
          });
        }
    
        return next.handle(request).pipe(
            catchError((error) => {
                if(error instanceof HttpErrorResponse) {
                    if(this.tokenService.hasToken())
                        this.tokenService.RemoveExpiredToken();

                    if(error.status === HttpStatusCode.Unauthorized)
                        this.router.navigate(['login']);
                }

                return throwError(error);
            })
        )
    }
}
