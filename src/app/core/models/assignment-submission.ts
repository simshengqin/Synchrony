import {Student} from './student';
import {Instructor} from './instructor';
import {Attachment} from './attachment';
import {Group} from './group';
import {Assignment} from './assignment';

export interface AssignmentSubmission {
  docId?: string;
  assignmentDocId?: string;
  instructorDocId?: string;
  studentDocId?: string;
  school?: string;
  group?: string;
  submitted_datetime?: number;
  student_attachment_scoresheet?: string;
  student_attachment_scoresheet_name?: string;
  student_attachment_recording?: string;
  student_attachment_recording_name?: string;
  feedback?: string;
  instructor_feedback_attachment_name?: string,
  instructor_feedback_attachment?: string;
  feedback_datetime?: number;

  // Not in database, manually created
  assignment?: Assignment;
  student?: Student;
  instructor?: Instructor;

}

