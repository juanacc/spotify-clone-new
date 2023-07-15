import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  //callback: EventEmitter<any> = new EventEmitter<any>();
  //myObservable1$: Observable<any> = new Observable();//EXPLICACION OBSERVABLE
  //myObservable1$: Subject<any> = new Subject();//EXPLICACION OBSERVABLE tipo SUBJECT
  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('AGUA CON BEHAVIOR SUBJECT');//EXPLICACION BEHAVIOR SUBJECT

  public audio!: HTMLAudioElement//con el ! indico que no lo quiero inicializar
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor() {
    //#region  
    //EXPLICACION OBSERVABLES
    // this.myObservable1$ = new Observable((observer: Observer<any>) => {
    //   //CASO OK
    //   observer.next('MUCHA AGUA')
      
    //   setTimeout(() => {
    //     observer.complete();
    //   }, 1000);

    //   //CASO DEFECTUOSO
    //   setTimeout(() => {
    //     observer.next('POCA AGUA');
    //   }, 2500);

    //   //CASO ERRONEO
    //   setTimeout(() => {
    //     observer.error('ERROR');
    //   }, 3500);
    // })

    //EXPLICACION SUBJECT
    // setTimeout(()=>{
    //   this.myObservable1$.next('ENVIO AGUA')
    // },2000)

    // setTimeout(()=>{
    //   this.myObservable1$.next('ENVIO MAS AGUA')
    // },3000)

    // setTimeout(()=>{
    //   this.myObservable1$.error('ERROR')
    // },4000)

    //EXPLICACION BEHAVIOR SUBJECT
    // setTimeout(()=>{
    //   this.myObservable1$.next('ENVIO AGUA')
    // },2000)

    // setTimeout(()=>{
    //   this.myObservable1$.next('ENVIO MAS AGUA')
    // },3000)

    // setTimeout(()=>{
    //   this.myObservable1$.error('ERROR')
    // },4000)
    //#endregion

    this.audio = new Audio();
    this.trackInfo$.subscribe(resOk => {
      if(resOk){
        this.setAudio(resOk);
      }
    })
  }

  private setAudio(track: TrackModel): void{
    console.log('DESDE MULTIMEDIA SERVICE:', track);
    this.audio.src = track.url;
    this.audio.play();
  }
}
