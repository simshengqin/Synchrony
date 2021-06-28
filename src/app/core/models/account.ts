
export interface Account {
  docId?: string;
  username?: string;
  password?: string;
  role?: Role;
  created_datetime?: number;
  ownerDocId?: string;
}
export enum Role {
  admin = 'admin',
  student = 'student',
  instructor = 'instructor',
  freelancer = 'freelancer'
}

