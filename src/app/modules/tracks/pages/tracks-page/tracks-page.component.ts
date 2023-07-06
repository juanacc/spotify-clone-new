import { Component } from '@angular/core';
//import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent {
  //mockTrackList: Array<TrackModel> = [];
  tracksTrending: TrackModel[] = [];
  tracksRandom: TrackModel[] = [];
  listObservers$: Subscription[] = [];
  
  constructor(private trackService: TrackService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    //const {data}: any = (dataRaw as any).default;// para poder obtener los datos al importar archivos json
    //this.mockTrackList = data;

    // solo para la explicacion de los observables
    // const observerTrackTrendings$ = this.trackService.dataTracksTrending$.subscribe(response=> {
    //   console.log('observer trending: ', response);
    //   this.tracksTrending = response;
    //   this.tracksRandom = response;
    //   this.listObservers$.push(observerTrackTrendings$);
    //   //this.listObservers$ =[observerTrackTrendings$];
    // })

    // const observerTrackRandom$ = this.trackService.dataTracksRandom$.subscribe(response=> {
    //   console.log('observer radom: ', response);
    //   //this.tracksRandom = response;
    //   //this.listObservers$.push(observerTrackRandom$);
    //   //this.listObservers$ =[observerTrackTrendings$];
    //   this.tracksRandom = [...this.tracksRandom, ...response];//agrego a lo que ya tiene, lo que esta entrando
    // })

    this.trackService.getAllTracks$().subscribe((tracks: TrackModel[]) => {
      console.log('tracks', tracks);
      this.tracksTrending = tracks;
    })

    this.trackService.getAllRandom$().subscribe((tracks: TrackModel[]) => {
      console.log('tracks', tracks);
      this.tracksRandom = tracks;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //this.listObservers$.forEach(o=>o.unsubscribe());
  }
}
