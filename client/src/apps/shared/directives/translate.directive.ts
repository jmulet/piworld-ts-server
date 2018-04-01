import { Directive, Input, ElementRef } from '@angular/core';
import { pwCore } from '../pw-core';

@Directive({
  selector: '[translate]'
})
export class TranslateDirective {
  
  constructor(elementRef: ElementRef) {      
      const key = elementRef.nativeElement.getAttribute('translate')
      console.log("Trying to translate ", key, "  --> ", pwCore.__(key));
      elementRef.nativeElement.innerHTML = pwCore.__(key);
  }
}