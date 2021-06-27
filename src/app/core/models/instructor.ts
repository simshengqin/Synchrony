import {Group} from './group';
import {Attachment} from './attachment';

export interface Instructor {
  docId?: string;
  name?: string;
  group?: Group;
  attachments?: Array<Attachment>;
}
