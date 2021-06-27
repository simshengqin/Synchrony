import {Student} from './student';
import {Instructor} from './instructor';
import {Attachment} from './attachment';
import {Group} from './group';

export interface Assignment {
  docId?: string;
  name?: string;
  status?: AssignmentStatus;
  due_datetime?: number;
  submitted_datetime?: number;
  student?: Student;
  studentId?: string;
  instructor?: Instructor;
  instructorId?: string;
  description?: string;
  student_attachments?: Array<Attachment>;
  feedback?: string;
  feedback_datetime?: number;
  instructor_attachments?: Array<Attachment>;
  school?: string;
  group?: string;
  created_datetime?: number;
}

export enum AssignmentStatus {
  pending =  'Pending',
  submitted = 'Submitted',
  late = 'Late'
}
