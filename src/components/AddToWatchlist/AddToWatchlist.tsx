import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';

type Props = { idMovie: number; onAddToWatchlist: (idMovie: number) => void };

const AddToWatchlist: FunctionComponent<Props> = ({ children, onAddToWatchlist, idMovie }) => {
  const handleOnClick = () => {
    onAddToWatchlist(idMovie);
  };

  return (
    <div className='container-movie'>
      {children}
      <div className='actions'>
        <Button onClick={handleOnClick} className='btn-action'>
          Adicionar a minha lista
        </Button>
      </div>
    </div>
  );
};

export default AddToWatchlist;
