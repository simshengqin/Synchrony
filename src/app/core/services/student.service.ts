import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Assignment} from '../models/assignment';
import {FirestoreService} from './firestore.service';
import {Instructor} from '../models/instructor';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setStudent(data: Student): Promise<string> {
    console.log(data);
    return this.fs.add('students', data);
  }
  getStudent(id: string): Observable<Student> {
    return this.fs.doc$('students/' + id);
  }
}
