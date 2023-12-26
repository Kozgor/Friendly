import { ChangeEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormLabel,
  Input,
  Typography
} from '@mui/joy';
import Toastr from '../Toastr/Toastr';
import { localStorageManager } from '../../utils/localStorageManager';
import { useStoreUser } from '../../utils/storeUserManager';

import { authAPI } from '../../api/AuthAPI';

import classes from './Login.module.scss';

function Login() {
  const { login } = authAPI();
  const navigate = useNavigate();
  const { addUserToStore } = useStoreUser();
  const { saveLocalUserData } = localStorageManager();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginRequest, setIsLoginRequest] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signInputsList = [
    {
      key: 'Name',
      value: email,
      onChange: handleEmailChange,
      inputParams: { placeholder: 'Name', autoComplete: 'auto' }
    },
    {
      key: 'Password',
      value: password,
      onChange: handlePasswordChange,
      inputParams: { placeholder: 'Password', type: 'password', autoComplete: 'auto' }
    }
  ];

  const handleSignInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (email.length && password.length) {
      setIsLoginRequest(true);

      try {
        const user = await login(email, password);

        setEmail('');
        setPassword('');
        setIsLoginRequest(false);
        addUserToStore(user);
        saveLocalUserData(user);

        if (user.role === 'user') {
          if (user.boards.active) {
            navigate(`/board/${user.boards.active}`);

            return;
          }

          navigate(`/board/${user.boards.finalized}`);

          return;
        }

        navigate('/admin/');
      } catch (error) {
        console.log(error);
        setIsLoginRequest(false);
        toast.error(
          <Toastr
            itemName='Login error'
            message='Empty login or password'
          />
        );

        return error;
      }
    } else {
      toast.error(
        <Toastr
          itemName='Login error'
          message='Wrong login or password'
        />
      );
    }

    return;
  };

  return (
    <div className={classes.loginContainer}>
      <Card
        sx={{
          width: '50%',
          maxWidth: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Typography component='h2' sx={{
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 0.8,
            background: 'linear-gradient(to left, var(--friendly-palette-secondary-200), var(--friendly-palette-secondary-900))',
            'WebkitTextFillColor': 'transparent',
            'WebkitBackgroundClip': 'text'
          }}>
            <p>start your</p><p><span className={classes.specialWord}>friendly</span> journey</p><p>now</p>
          </Typography>
          <form className={classes.signForm} data-testid="loginForm" onSubmit={handleSignInSubmit}>
            {signInputsList.map((input, index) => (
              <Fragment key={input.key}><div className={classes['form-control']}>
                <FormLabel htmlFor={input.key} sx={{
                  position: 'absolute',
                  top: '-10px',
                  left: '10px'
                }}>{input.key}</FormLabel>
                <Input
                  id={input.key}
                  variant="outlined"
                  color="neutral"
                  value={input.value}
                  onChange={input.onChange}
                  slotProps={{ input: input.inputParams }}
                  disabled={isLoginRequest}
                  data-testid={`loginInput${input.key}`}
                  sx={{
                    height: 30,
                    fontSize: '10px',
                    width: 200,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    '&.Mui-focused::before': {
                      '--Input-focused': 0
                    },
                    '& .MuiInput-input:-webkit-autofill': {
                      'WebkitBackgroundClip': 'text',
                      'WebkitBoxShadow': '0 0 0 0 white !important'
                    }
                  }}
                />
              </div>
                {index === 0 &&
                  <hr className={classes.divider} />
                }</Fragment>
            ))}
            <Button
              variant="soft"
              type="submit"
              color="secondary"
              aria-label="submit the form"
              data-testid="submitBtn"
              sx={{
                backgroundColor: 'var(--friendly-palette-secondary-900)',
                color: 'var(--friendly-palette-shades-50)',
                mr: '24px',
                fontSize: 16
              }}
            >
              {isLoginRequest ? <CircularProgress data-testid="submitProgress" /> : 'Let\'s Go'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className={classes.icon}></div>
    </div>
  );
}

export default Login;
