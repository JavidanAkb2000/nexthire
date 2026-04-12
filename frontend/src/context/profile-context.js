import { createContext } from 'react';

const ProfileContext = createContext();

export const defaultProfile = {
  fullName: 'Alex Kim',
  email: 'alexkim@nextmail.com',
  phone: '+48 555 240 991',
  preferredRole: 'Product Designer',
  workMode: 'Remote / Hybrid',
  salaryTarget: '$120k - $145k',
  location: 'Warsaw, Poland',
  targetRole: 'Product Designer',
  membership: 'Pro Member',
};

export default ProfileContext;
