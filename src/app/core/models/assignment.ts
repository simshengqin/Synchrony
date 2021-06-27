import {Student} from './student';
import {Instructor} from './instructor';
import {Attachment} from './attachment';
import {Group} from './group';

export interface Assignment {
  id?: number;
  name?: string;
  status?: AssignmentStatus;
  due_datetime?: number;
  submitted_datetime?: number;
  student?: Student; instructor?: Instructor;
  description?: string;
  student_attachments?: Array<Attachment>;
  feedback?: string;
  feedback_datetime?: number;
  instructor_attachments?: Array<Attachment>;
  group?: Group;
}

export enum AssignmentStatus {
  pending =  'Pending',
  submitted = 'Submitted',
  late = 'Late'
}
