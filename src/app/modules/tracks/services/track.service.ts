import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, map, mergeMap, of, tap } from 'rxjs';
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

  private skipById(trackList: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const tmpList = trackList.filter(t => t._id !== id);
      resolve(tmpList);
    })
  }

  getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map((data: any) => {//se podria usar una intereface para el tipado
        return data.data;        
      })
    );
  }

  // getAllRandom$(): Observable<any>{
  //   return this.httpClient.get(`${this.URL}/tracks`).pipe(
  //     map((data: any) => {//se podria usar una intereface para el tipado
  //       return data.data.reverse();        
  //     }),//el resultado de este mapeo es la entrada del siguiente map
  //     map((reverseData: any) => {
  //       return reverseData.filter((track: TrackModel) => track._id !== 1)
  //     })
  //   );
  // }

  //se llega al mismo resultado anterior pero hecho con promesas
  getAllRandom$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      mergeMap((data: any) => this.skipById(data.data, 2)),//el resultado de este mergeMap es la entrada del tap
      tap(data => console.log('operador tap ', data))
    );
  }
}
