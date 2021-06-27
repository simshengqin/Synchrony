import {Student} from './student';
import {Instructor} from './instructor';
import {Attachment} from './attachment';
import {Group} from './group';

export interface Assignment {
  docId?: string;
  description?: string;
  dueDatetime?: number;
  group?: string;
  instructorDocId?: string;
  name?: string;
  status?: AssignmentStatus;
  school?: string;
  studentDocId?: string;
  createdDatetime?: number;
  instructor_attachment: Attachment;
  instructor_attachment_name: string;
  student?: Student;
  instructor?: Instructor;
  // submitted_datetime?: number;
  // student?: Student;
  // studentId?: string;
  // instructor?: Instructor;
  // instructorId?: string;
  // description?: string;
  // student_attachments?: Array<Attachment>;
  // feedback?: string;
  // feedback_datetime?: number;
  // instructor_attachments?: Array<Attachment>;
  // school?: string;
  // group?: string;
}

export enum AssignmentStatus {
  pending =  'Pending',
  submitted = 'Submitted',
  late = 'Late'
}
