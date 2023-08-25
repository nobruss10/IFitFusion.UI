import { Injectable } from "@angular/core";

@Injectable()
export class JwtHelperService {
    public decodeToken(token: string = '') {
        if (token === null || token === '') { return { 'upn': '' }; }
        const parts = token.split('.');
        if (parts.length !== 3) {
            return false;
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            return false;
        }
        return JSON.parse(decoded);
    }
    
    public getTokenExpirationDate(token: string = '') {
        var decoded = this.decodeToken(token);

        if(typeof decoded.exp === "undefined") {
            return null;
        }

        var d = new Date(0);
        d.setUTCSeconds(decoded.exp);
  
        return d;  
    }

    public isTokenExpired(token: string = '') {
        var date = this.getTokenExpirationDate(token);
        var offsetSeconds = 0;

        if (date === null) {
            return true;
        }

        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));        
    }

    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                return false;
        }
        return decodeURIComponent((<any>window).escape(window.atob(output)));
    }
    
}