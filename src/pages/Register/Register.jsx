import { useState } from 'react';
import styles from './Register.module.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useStore } from '../../store';
import { setUser } from '../../store/storeAction';
import adjustStyle from './../../common-style/adjust-style.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [state, dispatch] = useStore();
  const {auth} = state;

  const handleRegister = (e) => {
    console.log('handle regis');
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
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
    <div className={`${styles['register-wrapper']} ${adjustStyle['column-center']}`}>
      <h3>Register</h3>
      <form onSubmit={handleRegister} className={`${styles['register-form']}`}>
        <label htmlFor="email">Email
          <input id='email' type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
        </label>
        <label htmlFor="password">Password
          <input id='password' type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
        </label>
        <button type="submit">Register</button>   
      </form>
      {authError && (
        <div>{authError}</div>
      )}
      <Link to="/login">Already have account? Login here!</Link>
    </div>
  )
}

export default Register;