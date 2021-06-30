import { Injectable } from '@angular/core';
import {FirestoreService} from './firestore.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  get(collection: string, filterName1: string, filterOp1: any, filterValue1: string,
      filterName2: string = '', filterOp2: any = '', filterValue2: any = '',
      filterName3: string = '', filterOp3: any = '', filterValue3: any = '',
      filterName4: string = '', filterOp4: any = '', filterValue4: any = '',
      sortColumn = '', isAsc = false): Observable<any[]> {
    return this.fs.col$(collection, ref => {
      let result;
      if (filterValue1 !== '') {result = ref.where(filterName1, filterOp1, filterValue1); }
      else if (filterValue2 !== '') {result = ref.where(filterName2, filterOp2, filterValue2); }
      else if (filterValue3 !== '') {result = ref.where(filterName3, filterOp3, filterValue3); }
      else if (filterValue4 !== '') {result = ref.where(filterName4, filterOp4, filterValue4); }
      for (let i = 1; i <= 4; i++) {
        switch (i) {
          case 1:
            if (filterValue1 !== '') {result = result.where(filterName1, filterOp1, filterValue1); }
            break;
          case 2:
            if (filterValue2 !== '') {result = result.where(filterName2, filterOp2, filterValue2); }
            break;
          case 3:
            if (filterValue3 !== '') {result = result.where(filterName3, filterOp3, filterValue3); }
            break;
          case 4:
            if (filterValue4 !== '') {result = result.where(filterName4, filterOp4, filterValue4); }
            break;
        }
      }
      return result;
    });
  }

}
