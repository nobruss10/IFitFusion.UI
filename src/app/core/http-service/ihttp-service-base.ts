import { Observable } from "rxjs";

export interface IhttpServiceBase {
    get(urlAction: string): Observable<any>;
    patch(urlAction: string, body?: any ): Observable<any>;
    post(urlAction: string, body?: any ): Observable<any>;
    put(urlAction: string, body?: any ): Observable<any>;
    delete(urlAction: string): Observable<any>;
    deleteWithBody(urlAction: string, body?: any): Observable<any>;
}
