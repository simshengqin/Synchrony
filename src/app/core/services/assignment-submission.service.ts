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



}
