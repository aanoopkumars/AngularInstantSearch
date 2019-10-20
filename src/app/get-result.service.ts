import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class GetResultService {

  constructor(private http: HttpClient) { }
  searchUrl = `https://randomuser.me/api/?results=100`;
  queryString = `?search=`;

  search(sTerm: Observable<string>) {
    return sTerm.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((item)=>{ return this.searchEntries(item)})   
    )

  }

  searchEntries(qString: string) {
     return this.http.get(this.searchUrl)
  }

}
