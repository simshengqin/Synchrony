import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';
import {Freelancer} from '../models/freelancer';

@Injectable({
  providedIn: 'root'
})

export class InstructorService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setInstructor(data: Instructor): Promise<string> {
    console.log(data);
    return this.fs.add('instructors', data);
  }
  getInstructors(): Observable<Array<Instructor>> {
    return this.fs.col$('instructors', ref => {
      return ref;
      // .orderBy('createdDatetime', 'desc');
    });
  }
  getInstructor(id: string): Observable<Instructor> {
    return this.fs.doc$('instructors/' + id);
  }
  getInstructorBySchoolAndGroup(school: string, group: string): Observable<any[]> {
    return this.fs.col$('instructors', ref => {
      return ref
        .where('school', '==', school)
        .where('group', '==', group);
    });
  }
  updateInstructor(docId: string, data: Instructor): Promise<void> {
    return this.fs.update('instructors/' + docId, data);
  }
  deleteInstructor(docId: string): Promise<void> {
    return this.fs.delete('instructors/' + docId);
  }
}
