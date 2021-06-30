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
      filterName2: string = '', filterOp2: any = '', filterValue2: string = '',
      sortColumn = '', isAsc = false): Observable<any[]> {
    return this.fs.col$(collection, ref => {
      if (filterName2 === '') {
        return ref.where(filterName1, filterOp1, filterValue1);
      }
      else {
        return ref.where(filterName1, filterOp1, filterValue1).where(filterName2, filterOp2, filterValue2);
      }
    });
  }

}
