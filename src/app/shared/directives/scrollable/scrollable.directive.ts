import { OnInit, Directive, Input, ElementRef } from '@angular/core';
declare var $: any;

@Directive({
    selector: 'scrollable'
})
export class ScrollableDirective implements OnInit {

    @Input() height: number | string = 0;
    @Input() useResizeWindow: boolean;
    @Input() notResize: boolean;

    defaultHeight = 250;

    constructor(public element: ElementRef) { }

    ngOnInit() {
        if(this.notResize)
            return;
            
        if(this.useResizeWindow) {
            this.autoRiziseWithWindow(this.element);
        } else {
            $(this.element.nativeElement).slimScroll({
                height: (this.height || this.defaultHeight)
            });
        }
    }

    private autoRiziseWithWindow(element: ElementRef) {
        let height = <number> this.height 
        $(this.element.nativeElement).slimScroll({
            height: (window.innerHeight - height || window.innerHeight - this.defaultHeight)
        });

        $(window).on('resize', () => {
            $(this.element.nativeElement).slimScroll({
                height: (window.innerHeight - height)
            });
        });
    }
}
