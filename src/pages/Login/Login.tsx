import Button from '@material-ui/core/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { FunctionComponent, useRef, useState } from 'react';
import ReactFacebookLogin from 'react-facebook-login';
import { Link, RouteComponentProps } from 'react-router-dom';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { homeRoute, signupRoute } from '../../constants/routes.constants';
import Auth from '../../infra/auth/Auth';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/result';
import { LoginDto } from '../../models/auth/login.dto';
import { SocialLoginDto } from '../../models/auth/socialLogin.dto';

const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const formRef = useRef<FormHandles>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = (data: LoginDto) => {
    setErrorMessages([]);
    Auth.login(data)
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

  const handleClickFacebookLogin = () => {};

  const handleFacebookResponse = (response: any) => {
    setErrorMessages([]);
    if (response.status === 'unknown') {
      Auth.loggout();
    } else {
      const loginDto = {
        name: response.name,
        email: response.email,
        socialLogin: {
          facebookId: response.userID,
        },
      } as SocialLoginDto;

      Auth.loginWithFacebook(loginDto)
        .then(() => {
          history.push(homeRoute);
        })
        .catch((err) => {
          setErrorMessages(['Falha ao tentar fazer login com facebook']);
        });
    }
  };

  return (
    <div className='login-container'>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className='login-card'>
          <div className='header'>
            <span className='title'>Login</span>
          </div>
          <InputForm name='email' label='Email' variant='outlined' />
          <InputForm name='password' label='Password' type='password' variant='outlined' />

          <Button className='btn-login' type='submit' variant='contained' color='primary'>
            Entrar
          </Button>

          <div className='errors'>
            {errorMessages.map((error: string, index: number) => (
              <AlertErrorMessage key={index} message={error} />
            ))}
          </div>

          <hr className='divider' />

          <span className='btn-registrar'>
            Não tem uma conta?
            <Link to={signupRoute} className='link-to-register'>
              <span className='label'>Registre-se</span>
            </Link>
          </span>

          <ReactFacebookLogin
            appId={process.env.APP_ID || ''}
            fields='name,email'
            onClick={handleClickFacebookLogin}
            callback={handleFacebookResponse}
            textButton={'Entrar com Facebook'}
          />
        </div>
      </Form>
    </div>
  );
};

export default Login;
