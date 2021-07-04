import {School} from './school';
import {Group} from './group';

export interface Freelancer {
  docId?: string;
  firstName?: string;
  lastName?: string;
  school?: string;
  group?: string;

  // Not in database, manually created
  freelancer_name?: string;
}
