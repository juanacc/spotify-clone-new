import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
//import * as dataRaw from '../../../data/tracks.json';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  //solo para explicacion de rxjs
  //dataTracksTrending$: Observable<TrackModel[]> = of([]);//creo e inicializo el observable como un array vacio
  //dataTracksRandom$: Observable<TrackModel[]> = of();

  private readonly URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    // const {data}: any = (dataRaw as any).default;
    
    // this.dataTracksTrending$ = of(data);
    // this.dataTracksRandom$ = new Observable(observer => {
    //   const trackExample: TrackModel ={
    //     _id:9,
    //     name: 'Leve',
    //     album:'Cartel de Santa',
    //     url:'http://',
    //     cover: 'https://www.deezer.com/mx/artist/13883'
    //   }
    //   setTimeout(() => {
    //     observer.next([trackExample]);
    //   }, 6000);
    // })
  }

  getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`);
  }
}
