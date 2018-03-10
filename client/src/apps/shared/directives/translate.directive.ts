import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[translate]'
})
export class TranslateDirective {
  
  constructor(elementRef: ElementRef) { 
      const __ = window["pwCore"]["__"];       
      const key = elementRef.nativeElement.getAttribute('translate')
      console.log("Trying to translate ", key, "  --> ", __(key));
      elementRef.nativeElement.innerHTML = __(key);
  }
}