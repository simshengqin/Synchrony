export enum SearchTypes {
  Services = 'services',
  Users = 'users'
}

export interface SearchTypeModel {
  name: SearchTypes;
  icon: string;
}

export const selectOptions = {
  gender: [
    'Male',
    'Female',
    'Unspecified'
  ],
  searchTypes: [
    {
      name: SearchTypes.Services,
      icon: 'local_mall'
    },
    {
      name: SearchTypes.Users,
      icon: 'person'
    }
  ],
  months: [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ],
  majorTitles: [
    'Associate',
    'Certificate',
    'B.A.',
    'BArch',
    'BM',
    'BFA',
    'B.Sc.',
    'J.D.',
    'M.D.',
    'Ph.D',
    'LLB',
    'LLM',
    'Other'
  ],
  languageProficiencies: [
    'basic',
    'conversational',
    'fluent',
    'native_bilingual'
  ],
  packageDeliveryDays: [
    1,
    3,
    5,
    7,
    10
  ],
  yearsOfExperiences: [
    'Less than a year',
    'years_of_experience_1',
    'years_of_experience_2',
    'years_of_experience_3',
    'years_of_experience_4',
    'years_of_experience_5',
    'More than 5 years'
  ]
};

