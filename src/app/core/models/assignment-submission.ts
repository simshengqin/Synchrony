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
  student_attachment: Attachment;
  instructor_attachment: Attachment;
  feedback?: string;
  feedback_datetime?: number;


}

