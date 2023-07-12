import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, map} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  addTrack$(track: any): Observable<any>{
    console.log('admin service', track);
    return this.httpClient.post(`${this.URL}/tracks/add`, track);
  }

  deleteTrack$(id: string): Observable<any>{
    console.log('admin service id', id);
    return this.httpClient.delete(`${this.URL}/tracks/delete/${id}`);
  }

  editTrack$(id: string, track: any): Observable<any>{
    console.log('admin service edit id', id);
    console.log('admin service edit track', track);
    return this.httpClient.put(`${this.URL}/tracks/edit/${id}`, track);
  }
}
