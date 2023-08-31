import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import axios from 'axios';

import classes from './Login.module.scss';

function Login() {
    const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
    const navigate = useNavigate();
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
        key: 'Email',
        value: email,
        onChange: handleEmailChange,
        inputParams: { placeholder: 'Email' }
      },
      {
        key: 'Password',
        value: password,
        onChange: handlePasswordChange,
        inputParams: { placeholder: 'Password', type: 'password' }
      }
    ];

    const handleSignInSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (email.length && password.length) {
        setIsLoginRequest(true);

        try {
          const response = await axios.post(`${FRIENDLY_DOMAIN}auth/login`, {
            email,
            password
          });

          setEmail('');
          setPassword('');
          setIsLoginRequest(false);

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('fullName', response.data.fullName);
          localStorage.setItem('role', response.data.role);
          response.data.role === 'user'
            ? navigate('/board-catalog')
            : navigate('/admin');
        } catch (error) {
          setIsLoginRequest(false);

          return error;
        }
      }

      return;
    };

    return (
        <>
          <Card
            sx={{
              width: 320,
              maxWidth: '100%',
              boxShadow: 'lg'
            }}
          >
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Typography fontSize="lg" fontWeight="lg">
                Welcome to Friendly
              </Typography>
              <form className={classes.signForm} data-testid="loginForm" onSubmit={handleSignInSubmit}>
                {signInputsList.map(input => (
                  <Input
                    key={input.key}
                    variant="outlined"
                    color="neutral"
                    value={input.value}
                    onChange={input.onChange}
                    slotProps={{ input: input.inputParams }}
                    sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    disabled={isLoginRequest}
                    data-testid={`loginInput${input.key}`}
                  />
                ))}
                <Button
                  variant="soft"
                  type="submit"
                  color="neutral"
                  aria-label="submit the form"
                  data-testid="submitBtn"
                >
                  {isLoginRequest ? <CircularProgress data-testid="submitProgress" /> : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
    );
}

export default Login;
