import { useState } from 'react';
import styles from './Login.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from '../../store';
import { setUser } from '../../store/storeAction';
import { Link, useNavigate } from 'react-router-dom';
import adjustStyle from './../../common-style/adjust-style.module.css';

function Login() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [state, dispatch] = useStore();
  const {auth} = state;

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch(setUser(user));
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setAuthError('Opps! Maybe next time.');
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(`${errorCode}: ${errorMessage}`)
      });
  }

  return(
    <div className={`${styles['login-wrapper']} ${adjustStyle['column-center']}`}>
      <h3>Login</h3>
      <form onSubmit={handleLogin} className={`${styles['login-form']}`}>
        <label htmlFor="email">Email
          <input id='email' type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
        </label>
        <label htmlFor="password">Password
          <input id='password' type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
        </label>
        <button type="submit">Login</button>   
      </form>
      {authError && (
        <div>{authError}</div>
      )}
      <Link to="/register">Don't have account? Register here!</Link>
    </div>
  )
}

export default Login;