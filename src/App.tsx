import { ChangeEvent, MouseEventHandler, useState } from 'react';
import './App.css';
import axios from 'axios';
import Board from './components/Board/Board';

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

  const handleClickSignIn: MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.value === 'Sign in'
      ? setNewUserRequest(false)
      : setNewUserRequest(true);
  };
  const handleClickSignOut: MouseEventHandler<HTMLInputElement> = () => {
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
    <div>
      <header>
        {!veryfiedProfile &&
          <span>
            <input onClick={handleClickSignIn} type='button' value='Sign in' />
            <input onClick={handleClickSignIn} type='button' value='Sig up' />
          </span>}
        {veryfiedProfile &&
          <span>
            <Board />
            <span>Hello, {veryfiedProfile.fullName}</span>
            <input onClick={handleClickSignOut} type='button' value='Sig out' />
          </span>}
      </header>
      <main>
        {(!isNewUser && !veryfiedProfile) &&
          <div>
            <form onSubmit={handleSignInSubmit}>
              <div>
                <label htmlFor="">Email</label>
                <input onChange={handleEmailChange} type="text" value={email} />
              </div>
              <div>
                <label htmlFor="">Password</label>
                <input onChange={handlePasswordChange} type="text" value={password} />
              </div>
              <input type="submit" value='send' />
            </form>
          </div>
        }
        {(isNewUser && !veryfiedProfile) &&
          <div>
            <form onSubmit={handleSignUpSubmit}>
              <div>
                <label htmlFor="">Full name</label>
                <input onChange={handleFullNameChange} type="text" value={fullName} />
              </div>
              <div>
                <label htmlFor="">Password</label>
                <input onChange={handlePasswordChange} type="text" value={password} />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input onChange={handleEmailChange} type="text" value={email} />
              </div>
              <div>
                <label htmlFor="">Description</label>
                <input onChange={handleDescriptionChange} type="text" value={description} />
              </div>
              <input type="submit" value='send' />
            </form>
          </div>
        }
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
