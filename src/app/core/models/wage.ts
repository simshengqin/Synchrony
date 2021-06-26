import {Freelancer} from './freelancer';

export interface Wage {
  WageId?: number;
  created_datetime?: number;
  hours?: number;
  freelancer?: Freelancer;
}
