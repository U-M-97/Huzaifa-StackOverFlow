import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth, provider } from '../../firebase';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [register, setregister] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');

  const [username, setusername] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');

  const navigate = useNavigate();

  const handlesigninGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      navigate('/');
      console.log(res);
    });
  };

  const handleregister = () => {
    seterror('');
    setloading(true);
    if (email === '' || password === '' || username === '') {
      setloading(false);
      seterror('Required fields missing');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setloading(false);
          console.log(res);
          navigate('/');
        })
        .catch((err) => {
          seterror('Error Registering');
          setloading(false);
        });
    }
  };

  const handleSignIn = () => {
    seterror('');
    setloading(true);
    if (email === '' || password === '') {
      seterror('Required field is missing');
      setloading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          setloading(false);
          navigate('/');
        })
        .catch((err) => {
          seterror('Error Signing In');
          setloading(false);
        });
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>Please Login Using On The Following Services</p>
        <div className="sign-options">
          <div onClick={handlesigninGoogle} className="single-option">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
            />
            <p>Login with Google</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input
                    type="text"
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    onChange={(e) => {
                      setpass(e.target.value);
                    }}
                  />
                </div>
                <button onClick={handleregister} disabled={loading}>
                  {loading ? 'Registering..' : 'Register'}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    onChange={(e) => {
                      setpass(e.target.value);
                    }}
                  />
                </div>
                <button onClick={handleSignIn} disabled={loading}>
                  {loading ? 'Signing In...' : 'Signin'}
                </button>
              </>
            )}
            <p
              onClick={() => {
                setregister(!register);
              }}
              style={{
                marginTop: '10px',
                textAlign: 'center',
                color: '#0095ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {register ? 'Login' : 'Register'}
            </p>
          </div>
        </div>
        {error != '' && (
          <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default Index;
