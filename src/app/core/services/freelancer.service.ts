import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';
import {Freelancer} from '../models/freelancer';

@Injectable({
  providedIn: 'root'
})

export class FreelancerService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setFreelancer(data: Freelancer): Promise<string> {
    console.log(data);
    return this.fs.add('freelancers', data);
  }
  getFreelancer(docId: string): Observable<Freelancer> {
    return this.fs.doc$('freelancers/' + docId);
  }
  getFreelancers(): Observable<Array<Freelancer>> {
    return this.fs.col$('freelancers', ref => {
      return ref;
        // .orderBy('createdDatetime', 'desc');
    });
  }



}
