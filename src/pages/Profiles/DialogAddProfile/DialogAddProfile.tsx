import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { FunctionComponent, useRef, useState } from 'react';
import InputForm from '../../../components/formComponents/InputForm';
import { UserService } from '../../../services/user.service';
import Auth from '../../../infra/auth/Auth';
import { Profile } from '../../../models/profile/profile';
import { Result } from '../../../infra/result';
import { ErrorHandler } from '../../../infra/errorHandler';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import DialogContentText from '@material-ui/core/DialogContentText';

type DialogProps = { open: boolean; onClose: (confirm: boolean) => void };

const DialogAddProfile: FunctionComponent<DialogProps> = ({ open, onClose }) => {
  const formRef = useRef<FormHandles>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    setErrorMessages([]);
    const newProfile = formRef.current?.getData() as Profile;
    const idUser = Auth.getPayload()?._id;

    if (newProfile && idUser) {
      UserService.addProfile(idUser, newProfile)
        .then((result) => {
          console.log(result);
          onClose(true);
        })
        .catch((resultError) => {
          console.log(resultError);

          handleErrors(resultError);
        });
    }
  };

  const handleErrors = (resultError: Result) => {
    if (resultError.errors) {
      const errors = resultError.errors;
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(errors, 'profiles');
      setErrorMessages(errorMessagesServer);

      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);
    } else {
      console.log(resultError);

      setErrorMessages(['Falha no servidor']);
    }
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>Adicionar Perfil</DialogTitle>
      <DialogContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputForm name='name' label='Nome do perfil' variant='outlined' />
        </Form>

        <DialogContentText>
          {errorMessages.map((error: string, index: number) => (
            <ErrorMessage key={index} message={error} />
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color='primary'>
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddProfile;
