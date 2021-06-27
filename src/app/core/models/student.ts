import {School} from './School';
import {Group} from './group';

export interface Student {
  StudentId?: number;
  name?: string;
  schools?: Array<School>;
  groups?: Array<Group>;
}
