import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';
import {Wage} from '../models/wage';

@Injectable({
  providedIn: 'root'
})

export class WageService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setWage(data: Wage): Promise<string> {
    console.log(data);
    return this.fs.add('wages', data);
  }
  getWagesByFreelancer(freelancerDocId: string): Observable<Array<Wage>> {
    console.log('hi' + freelancerDocId);
    return this.fs.col$('wages', ref => {
      return ref
        .where('freelancerDocId', '==', freelancerDocId);
        // .orderBy('createdDatetime', 'asc');
    });
  }


}
