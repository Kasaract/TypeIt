/**
 * Code adapted from Avnish Jayaswal
 * https://codesandbox.io/s/v4tv2?file=/src/App.js:0-40
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const onLogin = () => {
    axios
      .post('http://localhost:4000/auth/login', { username, password })
      .then((res) => {
        console.log(res);
        if ('error' in res.data) {
          console.log('error in res.data');
          let err = res.data;
          console.log('ERROR:', err);
          if (err.error === 'Username') {
            setUsernameError(err.msg);
          } else if (err.error === 'Password') {
            setPasswordError(err.msg);
          }
        } else {
          if (res.data.user) {
            localStorage.setItem('token', res.data.user);
            alert('Login successful!');
            window.location.href = '/home';
          } else {
            alert('Login unsuccessful. Please check your username or password.');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (event) => {
    let formIsValid = true;

    if (username.length < 3) {
      formIsValid = false;
      setUsernameError('Username must be longer than 3 characters.');
      return false;
    } else {
      setUsernameError('');
      formIsValid = true;
    }

    if (password.length < 3) {
      formIsValid = false;
      setPasswordError('Password must be longer than 3 characters');
      return false;
    } else {
      setPasswordError('');
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      onLogin();
    }
  };

  return (
    <div className="container vh-100">
      <div className="mt-auto">
        <div className="row h-100 d-flex justify-content-center">
          <div className="col-md-4" style={{ marginTop: '7.5rem' }}>
            <h1 className="text-center mb-5">TypeIt</h1>
            <h3 className="text-center mb-3">Login</h3>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group mb-2">
                <label className="fs-4">Username</label>
                <input
                  className="form-control"
                  id="UsernameInput"
                  name="UsernameInput"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <small id="usernameHelp" className="text-danger form-text">
                  {usernameError}
                </small>
              </div>
              <div className="form-group mb-2">
                <label className="fs-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Stay signed in</label>
              </div>
              <button type="submit" className="btn btn-primary w-100 fs-5 mb-3">
                Sign In
              </button>
              <div className="form-group">
                <p className="text-center">
                  Not a user? Register <Link to="/register">here</Link>!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
