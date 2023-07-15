import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  listResult: TrackModel[] = [];

  constructor(private searchService: SearchService){

  }

  receiveData(event: string): void{
    console.log("EN HISTORY PAGE", event);
    this.searchService.searchTracks$(event).subscribe(({data}) => {
      console.log('RESPUESTA DEL SERVICIO DE BUSQUEDA', data);
      this.listResult = data;
    })
  }

}
