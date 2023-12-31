import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, ElementRef } from '@angular/core';

@Component({
    selector: 'app-navsearch',
    templateUrl: './navsearch.component.html',
    styleUrls: ['./navsearch.component.scss']
})
export class NavsearchComponent implements OnInit, OnChanges {

    @Input() visible: boolean;
    @Output() onclose = new EventEmitter<boolean>();
    term: string;

    constructor(public elem: ElementRef) { }

    ngOnInit() {
        document.addEventListener('keyup', event => {
            if (event.keyCode === 27) {// ESC
                this.closeNavSearch();
            }
        });
        document.addEventListener('click', event => {
            const contains = (this.elem.nativeElement !== event.target && this.elem.nativeElement.contains(event.target));
            if (!contains) {
                this.closeNavSearch();
            }
        });
    }

    closeNavSearch() {
        this.visible = false;
        this.onclose.emit();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['visible'].currentValue === true) {
            this.elem.nativeElement.querySelector('input').focus();
        }
    }

    handleForm() {
    }
}
