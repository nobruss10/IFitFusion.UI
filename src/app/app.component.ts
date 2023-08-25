import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SettingsService } from './core/settings/settings.service';
import {CookieService} from 'ngx-cookie-service';
import { TranslatorService } from './core/translator/translator.service';
import { timer } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.getLayoutSetting('isFixed'); };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.getLayoutSetting('isCollapsed'); };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.getLayoutSetting('isBoxed'); };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.getLayoutSetting('useFullLayout'); };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.getLayoutSetting('hiddenFooter'); };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.getLayoutSetting('horizontal'); };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.getLayoutSetting('isFloat'); };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.getLayoutSetting('offsidebarOpen'); };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.getLayoutSetting('asideToggled'); };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.getLayoutSetting('isCollapsedText'); };

    constructor(
        public settings: SettingsService,
        private cookieService:CookieService,
        private readonly meta: Meta 
    ) { }

    ngOnInit() {


        // prevent empty links to reload the page
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && ['', '#'].indexOf(target.getAttribute('href') || '') > -1)
                e.preventDefault();
        });
        timer(5000).subscribe(() => {
            let initialSacale = (1/window.devicePixelRatio);
            // this.meta.removeTag('name="viewport"');
            // this.meta.addTag({ name: 'viewport', content: `width=1000,initial-scale=${initialSacale}` })
          })
    }
}
