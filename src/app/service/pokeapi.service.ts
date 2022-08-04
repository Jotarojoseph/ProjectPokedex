import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Observables
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  constructor(
    private _http: HttpClient
  ) { }

  get apiListAllPokemons(): Observable<any> {
    return this._http.get<any>(this.url).pipe(
      tap(  res => res),
      tap(  res => {
        res.results.map(  (resPokemons:any)=>{

          this.apiGetPokemons(resPokemons.url)
          .subscribe(
            res => resPokemons.status = res
          )

        })
      })
    )
  }
  public apiGetPokemons(  url:string): Observable<any>{

    return this._http.get<any>(url).pipe(
      map(
        res => res
      ))
  }

}
