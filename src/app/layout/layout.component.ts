import { Component, Inject, Injectable,ElementRef, AfterViewInit,ViewChild,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
@Injectable({
    providedIn: 'root'
  })
export class LayoutComponent implements OnInit  {
    showFeed: boolean = true;
    modal:BsModalRef;
    bsModalService:BsModalService
    constructor(@Inject(DOCUMENT) private document: Document,private router: Router,private modalService: BsModalService){
        router.events.subscribe((route) => {
            if(route instanceof NavigationEnd)
            this.showFeed = route.url == '/home'                
        });
    }
    ngOnInit() {
        
    }
    calcWidthScreen(){

    }
    getNativeElement(id:string):number{
        let el: HTMLElement = document.getElementById(id) as HTMLElement;
        return el.offsetWidth
    }
    ngAfterViewInit() {
       let content = this.document.getElementById('content-principal');
       let barMenuW = this.document.getElementById('fixedmenu')?.offsetWidth;
       let feedC = this.document.getElementById('feedCont')?.offsetWidth
       if(content && barMenuW){
        content.style.marginLeft = `${barMenuW}px`
       }
       if(content && feedC){
        content.style.width = content?.offsetWidth - feedC +'px';
       }
    }   
}
