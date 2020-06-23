import Button from '@material-ui/core/Button';
import React from 'react';
import { Profile } from '../../models/profile/profile';

type Props = {
  profile: Profile;
  onSetActiveProfile: (profile: Profile) => void;
  isActive: boolean;
};

const ProfileItem = (props: Props) => {
  const setActiveProfile = () => {
    props.onSetActiveProfile(props.profile);
  };

  return (
    <div className='profile'>
      <div>
        <span>{props.profile.name}</span>
      </div>
      {!props.isActive ? (
        <Button onClick={setActiveProfile} size='small' variant='text' color='secondary'>
          Selecionar
        </Button>
      ) : <span className="profile-selected">Selecionado</span>}
    </div>
  );
};

export default ProfileItem;
