import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  searchTracks$(term: string): Observable<any> {
    // return this.httpClient.get(`${this.URL}/tracks?src=${term}`)
    // .pipe(
    //   map((dataRaw:any) => dataRaw.data)
    // )
    return this.httpClient.get(`${this.URL}/tracks/${term}`)
    .pipe(
      map((dataRaw:any) => dataRaw.data.length > 0 ? dataRaw.data : [])
    )
  }
}
