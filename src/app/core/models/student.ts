import {School} from './School';
import {Group} from './group';

export interface Student {
  StudentId?: number;
  name?: string;
  school: string;
  group?: string;
}
