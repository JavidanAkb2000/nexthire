import { useEffect, useMemo, useState } from 'react';
import ProfileContext, { defaultProfile } from './profile-context';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const value = useMemo(() => ({ profile, setProfile, defaultProfile }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
