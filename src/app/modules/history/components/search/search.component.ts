import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() callBackData: EventEmitter<any>= new EventEmitter();
  src : string = '';

  search(term: string): void{
    // if(term.length > 3){ 
    //   //console.log('TERMINO', term);
    //   this.callBackData.emit(term);
    // }
    // else{
    //   //console.log('NO HAY TERMINO DE BUSQUEDA EN SEARCH COMPONENT');
    //   this.callBackData.emit('');
    // }
    term.length > 3 ? this.callBackData.emit(term) : this.callBackData.emit(''); 
  }
}
