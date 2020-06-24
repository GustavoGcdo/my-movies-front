import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';

type Props = { value: any; textAction?: string; onClickAction: (value: any) => void };

const MovieContainer: FunctionComponent<Props> = ({ children, onClickAction, value, textAction = 'action' }) => {
  const handleOnClick = () => {
    onClickAction(value);
  };

  return (
    <div className='container-movie'>
      {children}
      <div className='actions'>
        <Button onClick={handleOnClick} className='btn-action'>
          {textAction}
        </Button>
      </div>
    </div>
  );
};

export default MovieContainer;
