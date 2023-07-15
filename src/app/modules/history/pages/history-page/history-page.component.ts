import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  //listResult$: TrackModel[] = [];
  listResult$: Observable<any> = of([]); //para poder usar el pipe async

  constructor(private searchService: SearchService){

  }

  receiveData(event: string): void{
    console.log("EN HISTORY PAGE", event);
    // this.searchService.searchTracks$(event).subscribe(({data}) => {
    //   console.log('RESPUESTA DEL SERVICIO DE BUSQUEDA', data);
    //   this.listResult$ = data;
    // })

    this.listResult$ = this.searchService.searchTracks$(event);// cuando uso el pipe async no es necesario usar el subscribe ya que el ya se esta subscribiendo
  }

}
