import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { TranslatorService } from '../../../core/translator/translator.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class translateComponent {
  currentLanguage: string;
  showCurrentLanguage: string;
  allLanguages = this.getLangs();
  
  constructor(
    private translator: TranslatorService,
  ) {
    
    this.currentLanguage = !!this.translator.getDefaultLanguage() ? this.translator.getDefaultLanguage() : this.getLangs()[0].code;
    if(this.currentLanguage === 'br'){
      this.showCurrentLanguage = 'Português (Brasil)';
    } else if(this.currentLanguage === 'en'){
      this.showCurrentLanguage = 'English (US)';
    } else{
      this.showCurrentLanguage = 'Español';
    }
  }
  ngOnInit(): void {

  } 

  setLan(lan){
    if(lan === 'br'){
      this.showCurrentLanguage = 'Português (Brasil)';
    } else if(lan === 'en'){
      this.showCurrentLanguage = 'English (US)';
    } else{
      this.showCurrentLanguage = 'Español';
    }

    this.currentLanguage = lan;
    this.translator.useLanguage(lan);
  }

  getLangs() {
    return this.translator.getAvailableLanguages();
  }
}
