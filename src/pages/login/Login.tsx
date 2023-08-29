/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import { ChangeEvent, MouseEventHandler, useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import ButtonGroup from '@mui/joy/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';

const FRIENDLY_LINK = 'https://friendly-server-nf3k.onrender.com/';
const local = 'http://localhost:4444/';
interface UserProfile {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

function Login() {
    const navigate = useNavigate();
    const [isNewUser, setNewUserRequest] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [veryfiedProfile, setVerifyiedProfile] = useState<UserProfile | null>(
      null
    );

    const handleClickSignIn: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.currentTarget.value === 'Sign in'
        ? setNewUserRequest(false)
        : setNewUserRequest(true);
    };

    const handlePassword1Change = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword1(event.target.value);
      console.log(password1);
    };

    const handlePassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword2(event.target.value);
      console.log(password2);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };

    const handleSignInSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if(password1 === password2) {
        setPassword(password1);
      } else {
        console.log('password not matches');
        setPassword2('');
        setPassword2('');
      }

      try {
        const response = await axios.post(`${local}login`, {
          email,
          password
        });

        setVerifyiedProfile(response.data);
        localStorage.setItem('token', response.data.token);
        setEmail('');
        setPassword('');
        navigate('/board-catalog');
      } catch (error) {
        return error;
      }
    };

    const handleSignUpSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        const response = await axios.post(`${local}register`, {
          email,
          password
        });

        setVerifyiedProfile(response.data);
        setPassword('');
        setEmail('');

        setNewUserRequest(false);

        navigate('/board-catalog');
      } catch (error) {
        return error;
      }
    };
    return (
        <>
            {(!isNewUser && !veryfiedProfile) &&
                <Card
                sx={{
                    width: 320,
                    maxWidth: '100%',
                    boxShadow: 'lg'
                }}
                >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography fontSize="lg" fontWeight="lg">
                    Welcome!
                    </Typography>
                    <form onSubmit={handleSignInSubmit}>
                    <div>
                        <Input
                        variant="outlined"
                        color="primary"
                        value={email}
                        onChange={handleEmailChange}
                        slotProps={{ input: { placeholder: 'Email', type: 'email' } }}
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                        />
                    </div>
                    <div>
                        <Input
                        variant="outlined"
                        color="primary"
                        value={password}
                        onChange={handlePasswordChange}
                        slotProps={{ input: { placeholder: 'Password', type: 'password' } }}
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                        />
                    </div>
                    <Button
                        variant="soft"
                        type="submit"
                    >Submit</Button>
                    </form>
                </CardContent>
                </Card>
            }

            {(isNewUser && !veryfiedProfile) &&
                <Card
                sx={{
                    width: 320,
                    maxWidth: '100%',
                    boxShadow: 'lg'
                }}
                >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography fontSize="lg" fontWeight="lg">
                    Welcome!
                    </Typography>
                    <form onSubmit={handleSignUpSubmit}>

                      <div>
                          <Input
                          variant="outlined"
                          color="primary"
                          value={email}
                          onChange={handleEmailChange}
                          slotProps={{ input: { placeholder: 'Email' } }}
                          sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                          />
                      </div>

                      <div>
                          <Input
                          variant="outlined"
                          color="primary"
                          value={password1}
                          onChange={handlePassword1Change}
                          slotProps={{ input: { placeholder: 'Password', type: 'password' } }}
                          sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                          />
                      </div>
                      <div>
                          <Input
                          variant="outlined"
                          color="primary"
                          value={password2}
                          onChange={handlePassword2Change}
                          slotProps={{ input: { placeholder: 'Confirm password', type: 'password' } }}
                          sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                          />
                      </div>
                      <Button
                          variant="soft"
                          type="submit"
                      >Submit</Button>
                    </form>
                </CardContent>
                </Card>
            }
            {!veryfiedProfile &&

                <ButtonGroup
                    variant="soft"
                    color="primary"
                    aria-label="outlined primary button group"
                    buttonFlex="0 1 160px"
                    sx={{ width: '100%', justifyContent: 'center' }}
                >
                    <Button variant="solid" onClick={handleClickSignIn} value="Sign in">Sign in</Button>
                    <Button variant="solid" onClick={handleClickSignIn} value="Sign up">Sign up</Button>
                </ButtonGroup>
            }
            <div>
              <Link to="/auth/google">Login with Google</Link>
            </div>
        </>
    );
}

export default Login;
