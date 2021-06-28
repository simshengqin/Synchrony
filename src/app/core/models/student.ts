import {School} from './school';
import {Group} from './group';

export interface Student {
  docId?: number;
  firstName?: string;
  lastName?: string;
  school?: string;
  group?: string;
}
