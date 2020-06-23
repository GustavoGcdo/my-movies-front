import { Button } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import Auth from '../../infra/auth/Auth';
import { Profile } from '../../models/profile/profile';
import { UserService } from '../../services/user.service';
import './Profiles.scss';

const Profiles: FunctionComponent = () => {
  const [profilesList, setProfilesList] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState(Auth.getProfileActive());

  useEffect(() => {
    const payload = Auth.getPayload();
    if (payload) {
      UserService.getProfiles(payload._id).then((result) => {
        setProfilesList(result.data);
      });
    }
  }, []);

  const isActive = (profile: Profile) => {
    return activeProfile?._id === profile._id;
  };

  const handleSetActiveProfile = (profile: Profile) => {
    Auth.setProfileActive(profile);
    setActiveProfile(profile);
  };

  return (
    <div>
      <section className='section'>
        <span className='title'>Meus Perfis</span>

        <div className='add-profile-area'>
          <Button size='small' variant='contained' color='primary'>
            Adicionar Perfil
          </Button>
        </div>

        <div className='profiles'>
          {profilesList.map((profile) => (
            <ProfileItem
              key={profile._id}
              profile={profile}
              isActive={isActive(profile)}
              onSetActiveProfile={handleSetActiveProfile}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profiles;
