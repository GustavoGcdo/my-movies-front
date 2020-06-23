import { Button } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { FunctionComponent, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { homeRoute } from '../../constants/routes.constants';
import { SignUpDto } from '../../models/user/user.dto';
import { UserService } from '../../services/user.service';
import { Result } from '../../infra/result';
import { ErrorHandler } from '../../infra/errorHandler';

const Signup: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const formRef = useRef<FormHandles>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = (data: SignUpDto) => {
    setErrorMessages([]);

    UserService
    .sinup(data)
    .then((result) => {
      history.push(homeRoute);
    })
    .catch((resultError) => {
      handleErrors(resultError);
    });
  };

  const handleErrors = (resultError: Result) => {
    if (resultError.errors) {
      const errors = resultError.errors;
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(errors, 'email');
      setErrorMessages(errorMessagesServer);

      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);
    } else {
      setErrorMessages(['Falha no servidor']);
    }
  };

  return (
    <div className='login-container'>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className='login-card'>
          <span className='title'>Registrar-se</span>
          <InputForm name='name' label='Nome' variant='outlined' />
          <InputForm name='email' label='Email' variant='outlined' />
          <InputForm name='password' label='Senha' type='password' variant='outlined' />
          <InputForm name='confirmPassword' label='Confirme a senha' type='password' variant='outlined' />
          
          <InputForm name='birthday' label='Data de nascimento' type='date' variant='outlined' />
          
          <Button className='btn-login' type='submit' variant='contained' color='primary'>
            Cadastrar
          </Button>

          <div className='errors'>
            {errorMessages.map((error: string, index: number) => (
              <ErrorMessage key={index} message={error} />
            ))}
          </div>

        </div>
      </Form>
    </div>
  );
};

export default Signup;
