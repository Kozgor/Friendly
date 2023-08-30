import { ChangeEvent, MouseEventHandler, useState } from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import axios from 'axios';

import AdminPage from './pages/admin/Admin';
import Board from './components/Board/Board';
import { ColumnProvider } from './store/column-context';
import { IUserProfile } from './interfaces/user';
import { environment } from './environment';

import classes from './App.module.scss';

function App() {
  const [isNewUser, setNewUserRequest] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedProfile, setVerifiedProfile] = useState<IUserProfile | null>(
    null
  );

  const handleClickSignIn: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.currentTarget.value === 'Sign In'
      ? setNewUserRequest(false)
      : setNewUserRequest(true);
  };
  const handleClickSignOut = () => {
    setVerifiedProfile(null);
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

  const signInputsCollection = [
    {
      key: 'fullName',
      value: fullName,
      onChange: handleFullNameChange,
      inputParams: { placeholder: 'Full name' }
    },
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
    },
    {
      key: 'Description',
      value: description,
      onChange: handleDescriptionChange,
      inputParams: { placeholder: 'Description' }
    }
  ];

  const handleSignInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${environment.FRIENDLY_LINK}auth/login`,
        {
          email,
          password
        }
      );

      setVerifiedProfile(response.data);
      setEmail('');
      setPassword('');
    } catch (error) {
      return error;
    }
  };

  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${environment.FRIENDLY_LINK}auth/register`,
        {
          fullName,
          password,
          email,
          description
        }
      );

      setVerifiedProfile(response.data);
      setFullName('');
      setPassword('');
      setEmail('');
      setDescription('');
      setNewUserRequest(false);
    } catch (error) {
      return error;
    }
  };
  return (
    <ColumnProvider>
      <div className={classes.app}>
        {verifiedProfile && verifiedProfile.role === 'user' && (
          <Board
            fullName={verifiedProfile.fullName}
            isTimerVisible={true}
            onSignOut={handleClickSignOut}
          />
        )}
        {verifiedProfile && verifiedProfile.role === 'admin' && <AdminPage onSignOut={handleClickSignOut} />}
        {!isNewUser && !verifiedProfile && (
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
              <form className={classes.signForm} onSubmit={handleSignInSubmit}>
                {signInputsCollection.map((input) => {
                  if (input.key === 'Email' || input.key === 'Password') {
                    return (
                      <Input
                        key={input.key}
                        variant="outlined"
                        color="primary"
                        value={input.value}
                        onChange={input.onChange}
                        slotProps={{ input: input.inputParams }}
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                      />
                    );
                  }
                  return;
                })}
                <Button
                  variant="soft"
                  type="submit"
                  aria-label="submit the form"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {isNewUser && !verifiedProfile && (
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
              <form
                data-testid="signUpForm"
                className={classes.signForm}
                onSubmit={handleSignUpSubmit}
              >
                {signInputsCollection.map((input) => (
                  <Input
                    key={input.key}
                    variant="outlined"
                    color="primary"
                    value={input.value}
                    onChange={input.onChange}
                    slotProps={{ input: input.inputParams }}
                    sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                  />
                ))}
                <Button
                  variant="soft"
                  type="submit"
                  aria-label="submit the form"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        {!verifiedProfile && (
          <ButtonGroup
            variant="soft"
            color="primary"
            aria-label="outlined primary button group"
            buttonFlex="0 1 160px"
            sx={{ width: '100%', justifyContent: 'center' }}
          >
            <Button
              variant="solid"
              onClick={handleClickSignIn}
              value="Sign In"
              aria-label="Sign In"
            >
              Sign In
            </Button>
            <Button
              variant="solid"
              onClick={handleClickSignIn}
              value="Sign Up"
              aria-label="Sign Up"
            >
              Sign Up
            </Button>
          </ButtonGroup>
        )}
      </div>
    </ColumnProvider>
  );
}

export default App;
