import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';
import {AssignmentSubmission} from '../models/assignment-submission';

@Injectable({
  providedIn: 'root'
})

export class AssignmentSubmissionService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setAssignmentSubmission(data: AssignmentSubmission): Promise<string> {
    console.log(data);
    return this.fs.add('assignment_submissions', data);
  }
  getAssignmentSubmissionsByStudentAndAssignment(studentDocId: string, assignmentDocId: string): Observable<any[]> {
    return this.fs.col$('assignment_submissions', ref => {
      return ref
        .where('studentDocId', '==', studentDocId)
        .where('assignmentDocId', '==', assignmentDocId);
    });
  }
  updateAssignmentSubmission(docId: string, data: AssignmentSubmission): Promise<void> {
    console.log(data);
    return this.fs.update('assignment_submissions/' + docId, data);
  }




}
