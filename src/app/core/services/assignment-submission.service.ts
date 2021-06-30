import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AssignmentSubmission} from '../models/assignment-submission';
import {Role} from '../models/account';
import {FeedbackFilter} from '../models/FeedbackFilter';

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
  getAssignmentSubmissions(): Observable<Array<AssignmentSubmission>> {
    return this.fs.col$('assignment_submissions', ref => {
      return ref;
      // .orderBy('createdDatetime', 'desc');
    });
  }
  getAssignmentSubmission(docId: string): Observable<AssignmentSubmission> {
    return this.fs.doc$('assignment_submissions/' + docId);
  }
  getAssignmentSubmissionsBySchool(school: string, feedbackDatetime: boolean = null): Observable<any[]> {
    if (feedbackDatetime) {

    }
    return this.fs.col$('assignment_submissions', ref => {
      return ref
        .where('school', '==', school);
    });
  }
  getAssignmentSubmissionsByGroup(group: string, feedbackFilter = FeedbackFilter.with_and_without_feedback): Observable<any[]> {
    return this.fs.col$('assignment_submissions', ref => {
      switch (feedbackFilter) {
        case FeedbackFilter.with_feedback:
          return ref.where('group', '==', group).where('feedback_datetime', '!=', -1);
        case FeedbackFilter.without_feedback:
          return ref.where('group', '==', group).where('feedback_datetime', '==', -1);
        case FeedbackFilter.with_and_without_feedback:
          return ref.where('group', '==', group)
      }
      });
  }
  getAssignmentSubmissionsByInstructor(instructorDocId: string): Observable<any[]> {
    return this.fs.col$('assignment_submissions', ref => {
      return ref
        .where('instructorDocId', '==', instructorDocId);
    });
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
  deleteAssignmentSubmission(docId: string): Promise<void> {
    return this.fs.delete('assignment_submissions/' + docId);
  }




}
