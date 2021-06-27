import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';

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
  getAssignments(): Observable<Array<Assignment>> {
    return this.fs.col$('assignments', ref => {
      return ref
        .orderBy('created_datetime', 'desc');
    });
  }
  getAssignmentsByInstructor(docId: string): Observable<Array<Assignment>> {
    return this.fs.col$('assignments', ref => {
      return ref
        .where('instructorId', '==', docId)
        .orderBy('due_datetime', 'asc');
    });
  }
  deleteAssignment(docId: string): Promise<void> {
    return this.fs.delete('assignments/' + docId);
  }


}
