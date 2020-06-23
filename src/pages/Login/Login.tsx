import Button from '@material-ui/core/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { FunctionComponent, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { homeRoute } from '../../constants/routes.constants';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/result';
import { LoginDto } from '../../models/auth/login.dto';
import { AuthService } from '../../services/auth.service';
import './Login.scss';

const authService = new AuthService();
const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const formRef = useRef<FormHandles>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = (data: LoginDto) => {
    setErrorMessages([]);
    authService
      .login(data)
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
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(errors, 'auth');
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
          <span className='title'>Login</span>
          <InputForm name='email' label='Email' variant='outlined' />
          <InputForm name='password' label='Password' type='password' variant='outlined' />

          <Button className='btn-login' type='submit' variant='contained' color='primary'>
            Entrar
          </Button>

          <div className='errors'>
            {errorMessages.map((error: string, index: number) => (
              <ErrorMessage key={index} message={error} />
            ))}
          </div>

          <hr className='divider' />
          <span className='btn-registrar'>Registrar-se</span>
        </div>
      </Form>
    </div>
  );
};

export default Login;
