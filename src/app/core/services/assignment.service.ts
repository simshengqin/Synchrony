import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';

@Injectable({
  providedIn: 'root'
})

export class AssignmentService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setAssignment(data: Assignment): Promise<string> {
    console.log(data);
    return this.fs.add('assignments', data);
  }
  getAssignment(docId: string): Observable<Assignment> {
    return this.fs.doc$('assignments/' + docId);
  }
  getAssignments(): Observable<Array<Assignment>> {
    return this.fs.col$('assignments', ref => {
      return ref
        .orderBy('createdDatetime', 'desc');
    });
  }
  getAssignmentsByInstructor(instructorDocId: string): Observable<Array<Assignment>> {
    return this.fs.col$('assignments', ref => {
      return ref
        .where('instructorDocId', '==', instructorDocId);
        // .orderBy('createdDatetime', 'asc');
    });
  }
  updateAssignment(docId: string, data: Assignment): Promise<void> {
    return this.fs.update('assignments/' + docId, data);
  }
  deleteAssignment(docId: string): Promise<void> {
    return this.fs.delete('assignments/' + docId);
  }


}
