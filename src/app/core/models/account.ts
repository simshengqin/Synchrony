
export interface Account {
  docId?: string;
  username?: string;
  password?: string;
  role?: Role;
  created_datetime?: number;
  ownerDocId?: string;
}
export enum Role {
  admin = 'Admin',
  student = 'Student',
  instructor = 'Instructor',
  freelancer = 'Freelancer'
}

