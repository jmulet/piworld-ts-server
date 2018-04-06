import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import * as katex from 'katex';

export type KatexOptions = {
    displayMode?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: object;
    colorIsTextColor?: boolean;
    maxSize?: number;
}

@Directive({
    selector: '[katex]',
})
export class KatexDirective {

    @Input('katex') equation: string;
    @Input('katex-options') options: KatexOptions;

    @Output() onError = new EventEmitter<any>();

    constructor(private el: ElementRef) { }

    ngOnChanges() {
        try {            
            katex.render(this.equation, this.el.nativeElement, this.options);
        } catch (e) {
            console.log(e);
            this.onError.emit(e);
        }
    } 
}