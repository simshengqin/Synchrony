import {School} from './School';
import {Group} from './group';

export interface Student {
  StudentId?: number;
  username?: string;
  schools?: Array<School>;
  groups?: Array<Group>;
}
