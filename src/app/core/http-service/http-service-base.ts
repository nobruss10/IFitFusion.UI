import { catchError, map, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { IhttpServiceBase } from "./ihttp-service-base";

export class HttpServiceBase implements IhttpServiceBase {

    private _headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, PATCH, DELETE',
        'Cookies': ''
    };

    constructor(protected http: HttpClient, private serviceBaseUrl: string) {
    }

    setHeaders(headers) {
        this._headers = headers;
    }

    setHeader(key: string, value: string) {
        if (key != null && value != null) {
            this._headers[key] = value;
        }
    }

    get(urlAction: string, params?: HttpParams): Observable<any> {
        const headers = this.getHeader();
        const response = this.http.get(`${this.serviceBaseUrl}/${urlAction}`, { headers, params }).pipe(
            map(this.extractResponse),
            catchError(this.serviceError)
        );

        return response;
    }

    patch(urlAction: string, body?: any): Observable<any> {
        const headers = this.getHeader();
        const response = this.http.patch(`${this.serviceBaseUrl}/${urlAction}`, body, { headers }).pipe(
            map(this.extractResponse),
            catchError(this.serviceError)
        );

        return response;
    }

    post(urlAction: string, body?: any): Observable<any> {
        const headers = this.getHeader();
        const response = this.http.post(`${this.serviceBaseUrl}/${urlAction}`, body, { headers }).pipe(
            map(this.extractResponse),
            catchError(this.serviceError)
        );

        return response;
    }

    put(urlAction: string, body?: any): Observable<any> {
        const headers = this.getHeader();
        const response = this.http.put(`${this.serviceBaseUrl}/${urlAction}`, body, { headers }).pipe(
            map(this.extractResponse),
            catchError(this.serviceError)
        );

        return response;
    }

    delete(urlAction: string): Observable<any> {
        const headers = this.getHeader();
        const response = this.http.delete(`${this.serviceBaseUrl}/${urlAction}`, { headers }).pipe(
            map(this.extractResponse),
            catchError(this.serviceError)
        );

        return response;
    }

    deleteWithBody(urlAction: string, body?: any): Observable<any> {
        const headers = this.getHeader();
        const options = {
            headers: headers,
            body: body
        };
        const response = this.http.delete(`${this.serviceBaseUrl}/${urlAction}`, options).pipe(
            map(this.extractResponse),
            catchError(this.serviceError)
        );

        return response;
    }

    protected getHeader(): HttpHeaders {
        const headers = new HttpHeaders(this._headers);
        return headers;
    }

    protected extractResponse(response: object): object {
        return response;
    }

    protected serviceError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return throwError(error);
    }
}
