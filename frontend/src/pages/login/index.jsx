
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../../utils/constant';
import { useUser } from '../../lib/customHooks';
import { storeInSessionStorage } from '../../lib/common';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import './login.scss';

function App(setUser) {
  const [showLogin, setShowLogin] = useState(true);
  const [ status, setStatus ] = useState('Envoyer');
  const navigate = useNavigate();
  const { auth, connectedUser, setConnectedUser } = useUser();
  const [notification, setNotification] = useState({ error: false, message: '' });
  /*vérification de l'utilisateur connecté ou pas */
  useEffect(() => {
  if (connectedUser || auth) {
    navigate('/account');
  }
  }, [auth, connectedUser, navigate])
  const handleToggleForm = (isLogin) => {
    setShowLogin(isLogin);
  };

  /*fonction pour afficher/masquer le mot de passe */
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => {
    setPasswordVisible(!passwordVisible);
  }

  /*fonction qui gère le formulaire de connexion */
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setStatus('Envoi...');
    const loginEmail = event.target.elements.login_email.value;
    const loginPassword = event.target.elements.login_password.value;

    let loginDetails = {
      email: loginEmail,
      password: loginPassword, 
    };

    try {
      const response = await fetch(API_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      })
      
      const data = await response.json();

      if (!data?.token) {
        setNotification({ error: true, message: 'Une erreur est survenue' });
        console.log('Something went wrong during signing in: ', response);
        setStatus('Envoyer');
      } else {
        storeInSessionStorage(data.token, data.user_id);
        setConnectedUser(data.user_id);
        navigate('/dashboard');
      }} catch (err) {
      setNotification({ error: true, message: err.message });
      console.log('Some error occured during signing in: ', err);
      setStatus('Envoyer');
    }
  };

  /*fonction qui gère le formulaire d'inscription */
  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setStatus('Envoi...');
    const registerEmail = event.target.elements.register_email.value;
    const registerPassword = event.target.elements.register_password.value;

    let registerDetails = {
      email: registerEmail,
      password: registerPassword,
    };
    try {
      let response = await fetch(API_ROUTES.REGISTER, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
      });
      setStatus('Envoyer');
      if (!response?.data) {
        console.log('Something went wrong during signing up: ', response);
        return;
      }
      setNotification({ error: false, message: 'Votre compte a bien été créé, vous pouvez vous connecter' });
    } catch (err) {
      setNotification({ error: true, message: err.message });
      console.log('Some error occured during signing up: ', err);
    }
  };
  const errorClass = notification.error;
  return (
    <div className='App'>
      <header className='App-form'>
      <div className={`${errorClass}`}>
        {notification.message.length > 0 && <p>{notification.message}</p>}
      </div>
      <div className='form-selector'>
      <div className={showLogin ? 'login-active' : 'login-inactive'} onClick={() => handleToggleForm(true)}>Login</div>
      <div className={!showLogin ? 'register-active' : 'register-inactive'} onClick={() => handleToggleForm(false)}>Register</div>
      </div>
      {showLogin ? (
        /*formulaire de connexion */
        <form onSubmit={handleSubmitLogin} className='login-form' method='post'>
            <label className='form-title'>Login</label>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='email' name='email' className='email' id='login_email' placeholder='entrez votre Email' />
            <label htmlFor='password' className='form-label'>Password</label>
            <div className='password-input-wrapper'>
            <input type={passwordVisible ? 'text' : 'password' } name='password' className='password' id='login_password' placeholder='entrez votre mot de passe' />
            <span onClick={handleClick} className='eye-icon'>
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            </div>
            <button type='submit' className='form-button'>{status}</button>
        </form>
        ) : (
          /*formulaire d'inscription */
        <form onSubmit={handleSubmitRegister} className='register-form' method='post'>
            <label className='register-title'>Or create an account</label>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='email' name='email' className='email' id='register_email' placeholder='entrez votre Email' />
            <label htmlFor='password' className='form-label'>Password</label>
            <div className='password-input-wrapper'>
            <input type={passwordVisible ? 'text' : 'password' } name='password' className='password' id='register_password' placeholder='entrez votre mot de passe' />
            <span onClick={handleClick} className='eye-icon'>
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            </div>
            <button type='submit' className='form-button'>{status}</button>
        </form>
        )}
      </header>

    </div>
  );
}

export default App;
