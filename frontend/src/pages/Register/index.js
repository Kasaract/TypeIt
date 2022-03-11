/**
 * Code adapted from Avnish Jayaswal
 * https://codesandbox.io/s/v4tv2?file=/src/App.js:0-40
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const history = useHistory();

  const onRegister = () => {
    axios
      .post('http://localhost:4000/auth/register', { username, password })
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
          history.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = () => {
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

  const registrationSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      onRegister();
    }
  };

  return (
    <div className="container vh-100">
      <div className="mt-auto">
        <div className="row h-100 d-flex justify-content-center">
          <div className="col-md-4" style={{ marginTop: '12.5rem' }}>
            <h1 className="text-center mb-5">TypeIt</h1>
            <h3 className="text-center mb-3">Register</h3>
            <form id="registrationform" onSubmit={registrationSubmit}>
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
              <div className="form-group mb-4">
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
              <button type="submit" className="btn btn-primary w-100 fs-5 mb-3">
                Register
              </button>
              <div className="form-group">
                <p className="text-center">Already a user? Login here!</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
