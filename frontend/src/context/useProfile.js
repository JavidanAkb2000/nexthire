import { useContext } from 'react';
import ProfileContext from './profile-context';

export function useProfile() {
  return useContext(ProfileContext);
}
