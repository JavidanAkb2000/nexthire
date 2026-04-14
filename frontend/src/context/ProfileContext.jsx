import { useEffect, useMemo, useState } from 'react';
import ProfileContext, { defaultProfile } from './profile-context';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    // Eskiden kalan kayıtlı profil varsa al, yoksa varsayılanı (Alex Kim) yükle
    const saved = localStorage.getItem('profile');
    let currentProfile = saved ? JSON.parse(saved) : { ...defaultProfile };

    // YENİ: Tarayıcı hafızasından giriş yapan kişinin emailini çek
    const userEmail = localStorage.getItem('email') || localStorage.getItem('username');
    
    // Eğer email varsa, isme dönüştür ve tüm sisteme dağıt
    if (userEmail) {
      const namePart = userEmail.split('@')[0]; // "kkaan@gmail.com" -> "kkaan"
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase(); // "kkaan" -> "Kkaan"
      
      currentProfile.fullName = formattedName;
      currentProfile.email = userEmail;
    }

    return currentProfile;
  });

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const value = useMemo(() => ({ profile, setProfile, defaultProfile }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}