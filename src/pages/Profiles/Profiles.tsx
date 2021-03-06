import { Button } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import Auth from '../../infra/auth/Auth';
import { Profile } from '../../models/profile/profile';
import { UserService } from '../../services/user.service';
import './Profiles.scss';
import DialogAddProfile from './DialogAddProfile/DialogAddProfile';

const Profiles: FunctionComponent = () => {
  const [profilesList, setProfilesList] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState(Auth.getProfileActive());
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = () => {
    const payload = Auth.getPayload();
    if (payload) {
      UserService.getProfiles(payload._id).then((result) => {
        setProfilesList(result.data);
      });
    }
  };

  const isActive = (profile: Profile) => {
    return activeProfile?._id === profile._id;
  };

  const handleSetActiveProfile = (profile: Profile) => {
    Auth.setProfileActive(profile);
    setActiveProfile(profile);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOnCloseDialog = (confirm: Boolean) => {
    setOpenDialog(false);
    if (confirm) {
      getProfiles();
    }
  };

  return (
    <div>
      <section className='section'>
        <span className='title'>Meus Perfis</span>

        <div className='add-profile-area'>
          <Button onClick={handleOpenDialog} size='small' variant='contained' color='primary'>
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
      <DialogAddProfile open={openDialog} onClose={handleOnCloseDialog} />
    </div>
  );
};

export default Profiles;
