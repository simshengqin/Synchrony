import {Group} from './group';
import {Attachment} from './attachment';

export interface Instructor {
  group?: Group;
  attachments?: Array<Attachment>;
}
