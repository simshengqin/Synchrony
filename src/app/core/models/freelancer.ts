import {School} from './School';
import {Group} from './group';

export interface Freelancer {
  FreelancerId?: number;
  username?: string;
  schools?: Array<School>;
  groups?: Array<Group>;
}
