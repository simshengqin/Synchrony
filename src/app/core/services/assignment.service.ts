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

  getAssignments(): Observable<Array<Assignment>> {
    return this.fs.col$('assignments', ref => {
      return ref
        .orderBy('id', 'asc');
    });
  }
  getAssignmentsByInstructor(docId: string): Observable<Array<Assignment>> {
    return this.fs.col$('assignments', ref => {
      return ref
        .where('instructorId', '==', docId)
        .orderBy('due_datetime', 'asc');
    });
  }

}
