import classes from './App.module.scss';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import axios from 'axios';
import Board from './components/Board/Board';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import ButtonGroup from '@mui/joy/ButtonGroup';

const FRIENDLY_LINK = 'https://friendly-server-nf3k.onrender.com/'
interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

function App() {
  const [isNewUser, setNewUserRequest] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [veryfiedProfile, setVerifyiedProfile] = useState<UserProfile | null>(null);

  const handleClickSignIn: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.currentTarget.value === 'Sign in'
      ? setNewUserRequest(false)
      : setNewUserRequest(true);
  };
  const handleClickSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    setVerifyiedProfile(null);
  };
  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSignInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${FRIENDLY_LINK}auth/login`, {
        email,
        password,
      });

      setVerifyiedProfile(response.data)
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${FRIENDLY_LINK}auth/register`, {
        fullName,
        password,
        email,
        description
      });

      setVerifyiedProfile(response.data)
      setFullName('');
      setPassword('');
      setEmail('');
      setDescription('');
      setNewUserRequest(false)
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  return (
    <div className={classes.app}>
      {veryfiedProfile &&
        <span>
          <span className={classes.userBlock}>Hello, {veryfiedProfile.fullName}
            <Button variant="plain" onClick={handleClickSignOut}>Sig out</Button>
          </span>
          <Board />
          
        </span>}
        {(!isNewUser && !veryfiedProfile) &&
          <Card
            sx={{
              width: 320,
              maxWidth: '100%',
              boxShadow: 'lg',
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
              boxShadow: 'lg',
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
                      value={fullName}
                      onChange={handleFullNameChange}
                      slotProps={{ input: { placeholder: 'Full name' } }}
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
                    value={description}
                    onChange={handleDescriptionChange}
                    slotProps={{ input: { placeholder: 'Description' } }}
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
              color='primary'
              aria-label="outlined primary button group"
              buttonFlex="0 1 160px"
              sx={{ width: '100%', justifyContent: 'center' }}
            >
              <Button variant="solid" onClick={handleClickSignIn} value="Sign in">Sign in</Button>
              <Button variant="solid" onClick={handleClickSignIn} value="Sign up">Sign up</Button>
            </ButtonGroup>
        }
    </div>
  );
}

export default App;
