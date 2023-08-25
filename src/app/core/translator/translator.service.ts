import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import {UserSettingsService} from '../user-settings/user-settings.service';
const ACTUAL_TRANSLATE = 'actualTranslate';

@Injectable()
export class TranslatorService {

    private defaultLanguage: string = 'br';

    private availablelangs = [
        { code: 'br', text: 'Portuguese' },
        { code: 'en', text: 'English' },
        { code: 'es_AR', text: 'Spanish' }
    ];

    constructor(public translate: TranslateService, private userSettingsService: UserSettingsService,) {
        let defaultLanguage = userSettingsService.getLanguage();
        translate.setDefaultLang(defaultLanguage);
        this.useLanguage(defaultLanguage);
    }

    useLanguage(lang: string) {
        let currentLang = this.translate.getDefaultLang();
        let saveLang = this.userSettingsService.getLanguage();
        if(!!lang && saveLang !=lang){
            this.userSettingsService.setLanguage(lang);
            currentLang = lang;
        }
        this.translate.use(lang);
    }

    getDefaultLanguage(){
        return this.translate.getDefaultLang();
    }

    getAvailableLanguages() {
        return this.availablelangs;
    }
}
