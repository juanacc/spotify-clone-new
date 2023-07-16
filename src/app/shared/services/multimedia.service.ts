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
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

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
    });
    this.listenAllEvents();
  }

  private setAudio(track: TrackModel): void{
    //console.log('DESDE MULTIMEDIA SERVICE:', track);
    this.audio.src = track.url;
    this.audio.play();
  }

  //private calculateTime(): void{//no funciona como una funcion normal
  private calculateTime = () => {
    //console.log('disparando evento');
    const {duration, currentTime} = this.audio;
    //console.table([duration,currentTime]);
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  private setPlayerStatus = (state: any) => {
    //console.log('STATE: ', state);
    switch(state.type){
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
        break;
    }
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60); //para que me de 1, 2, 3, etc, etc
    let minutes = Math.floor((currentTime / 60) % 60);
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds; //00:00 ---> 01:05--->10:15
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes; //00:00 ---> 01:05--->10:15
    const displaFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displaFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void{
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60); //para que me de 1, 2, 3, etc, etc
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds; //00:00 ---> 01:05--->10:15
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes; //00:00 ---> 01:05--->10:15
    const displaFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displaFormat);

  }

  public togglePlayer(): void{
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  private listenAllEvents(): void{
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  public seekAudio(percentage: number): void {
    const {duration} = this.audio;
    const percentageToSecond = (percentage * duration) / 100;
    this.audio.currentTime = percentageToSecond;
  }

}
