import {Student} from './student';
import {Instructor} from './instructor';
import {Attachment} from './attachment';
import {Group} from './group';

export interface AssignmentSubmission {
  docId?: string;
  assignmentDocId?: string;
  instructorDocId?: string;
  studentDocId?: string;
  school?: string;
  group?: string;
  submitted_datetime?: number;
  student_attachment?: Attachment;
  student_attachment_name?: string;
  feedback?: string;
  feedback_datetime?: number;


}

