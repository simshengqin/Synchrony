import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';

@Injectable({
  providedIn: 'root'
})

export class InstructorService {

  constructor(
    private fs: FirestoreService
  ) {
  }

  getInstructor(id: string): Observable<Instructor> {
    return this.fs.doc$('instructors/' + id);
  }
}
