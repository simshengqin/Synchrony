import {Student} from './student';
import {Instructor} from './instructor';
import {Attachment} from './attachment';
import {Group} from './group';

export interface AssignmentSubmission {
  docId?: string;
  assignmentDocId?: string;
  instructorDocId?: string;
  studentDocId?: string;
  schoolDocId?: string;
  groupDocId?: string;
  submitted_datetime?: number;
  student_attachments?: Array<Attachment>;
  instructor_attachments?: Array<Attachment>;
  feedback?: string;
  feedback_datetime?: number;


}

