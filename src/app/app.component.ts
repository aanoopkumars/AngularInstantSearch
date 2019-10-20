import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GetResultService } from './get-result.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [];
  serachString = new Subject<string>();
  searchS = '';
  
  constructor(private serachS: GetResultService){
    this.serachS.search(this.serachString)
    .subscribe((res: {results , total: number})=> {
      // this.items = res.results;
      console.dir(res.results);
      console.log(res.results[0].name.first)

      let filteredArr = res.results.filter((element) => {
         let fN = element.name.first;
         let LN = element.name.last;
         let Na = fN+LN;
         return Na.includes(this.searchS)
      })

      this.items = filteredArr;
    })
  }
  // we r directly calling subject.next from template - good approach
  // onSearch(evnt) {
  //   console.log(evnt);
  // }
}
