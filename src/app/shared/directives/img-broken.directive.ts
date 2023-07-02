import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = '';
  @HostListener('error') handleError() : void {
    const elNative = this.elHost.nativeElement;
    console.log('esta imagen esta rota', this.elHost);
    //elNative.src = 'https://i.imgur.com/fFU3IqP.png'
    elNative.src = this.customImg !== '' ? this.customImg : 'https://i.imgur.com/fFU3IqP.png';
  }

  constructor(private elHost: ElementRef) { 
    
  }

}
