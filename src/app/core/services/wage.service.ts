import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';
import {Wage} from '../models/wage';
import {Student} from '../models/student';
import {Account} from '../models/account';

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
  getWages(): Observable<Array<Wage>> {
    return this.fs.col$('wages', ref => {
      return ref;
      // .orderBy('createdDatetime', 'desc');
    });
  }
  getWage(id: string): Observable<Wage> {
    return this.fs.doc$('wages/' + id);
  }
  getWagesByFreelancer(freelancerDocId: string): Observable<Array<Wage>> {
    console.log('hi' + freelancerDocId);
    return this.fs.col$('wages', ref => {
      return ref
        .where('freelancerDocId', '==', freelancerDocId);
        // .orderBy('createdDatetime', 'asc');
    });
  }
  updateWage(docId: string, data: Wage): Promise<void> {
    return this.fs.update('wages/' + docId, data);
  }
  deleteWage(docId: string): Promise<void> {
    return this.fs.delete('wages/' + docId);
  }

}
