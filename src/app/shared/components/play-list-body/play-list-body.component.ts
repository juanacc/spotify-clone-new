import { Component, Input } from '@angular/core';
//import * as dataRaw from '../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
//import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent {
  @Input() tracks: TrackModel[] = [];
  optionSort: {property: string | null, order: string} = {property:null, order: 'asc'};

  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //const {data}: any = (dataRaw as any).default;// para poder obtener los datos al importar archivos json
    //this.tracks = data;
    // this.trackService.getAllTracks$().subscribe(tracks => {
    //   //console.log('TRACKS EN PLAY LIST BODY', res)
    //   this.tracks = tracks;
    // })
  }

  changeSort(property: string): void{
    const {order} = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
  }
}
