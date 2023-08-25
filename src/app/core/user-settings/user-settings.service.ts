import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {KEYS,DEFAULT_LANGUAGE,FORMAT_DATE} from './models/user-settings'
@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  constructor(){}
  private setInLocalStorage(key: number, value: any): void {
    localStorage.setItem(KEYS[key], value)
  }
  public getLoadInterval():number {
    const timeInterval  = localStorage.getItem(KEYS[1]);
    if (!timeInterval){
      this.setInLocalStorage(1,0)
      return 0;
    }
    return parseFloat(timeInterval);
  }
  public setLoadInterval(lastRefresh):void {
    this.setInLocalStorage(1,lastRefresh)
  }
  public getLanguage():string {
    let currentLanguage = localStorage.getItem(KEYS[0]);
    if (!currentLanguage){
      this.setInLocalStorage(0,DEFAULT_LANGUAGE);
      currentLanguage = DEFAULT_LANGUAGE;
    }
    return currentLanguage
  }
  public setLanguage(language:string = ''):void {
    this.setInLocalStorage(0,language);
  }
  public getLastUpdateDashboard():string{
    let lastLoadDashboard = localStorage.getItem(KEYS[2]) ?? '' ;
    return lastLoadDashboard; 
  }
  public setLastUpdateDashboard():void{
    const now =  moment().format(FORMAT_DATE);
    this.setInLocalStorage(2,now);
  }
}