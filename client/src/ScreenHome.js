import React, { useState } from 'react';
import './App.css';
import { Input, Button, Alert} from 'antd';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

function ScreenHome(props) {
  const [signupLogin, setSignupLogin] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signinLogin, setSigninLogin] = useState('')
  const [signinPassword, setSigninPassword] = useState('')
  const [user, setUser] = useState(false)
  const [error, setError] = useState(false)

  //---------Signup--------
  const handleSubmitSignUp = () => {
    const signup = async () => {
     const responseFromServer = await fetch('/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `login=${signupLogin}&password=${signupPassword}`
      })
      const responseFromServerJson = await responseFromServer.json()
      console.log(responseFromServerJson)
      if(responseFromServerJson.status === 200){
        //console.log(responseFromServerJson.token)
        props.getToken(responseFromServerJson.user.token)
        setUser(true)
      }else{
        setError(true)
      }
    }
    signup()
  }

//---------Signup--------
//---------Signin--------

  const handleSubmitSignIn = () => {
    const signin = async () => {
      const responseFromServer = await fetch('/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        body: `emailFromFront=${signinLogin}&passwordFromFront=${signinPassword}`
      })
      const responseFromServerJson = await responseFromServer.json()
      console.log(responseFromServerJson)
      if(responseFromServerJson.login){
        console.log(responseFromServerJson.user)
        setUser(true)
        props.getToken(responseFromServerJson.user.token)
      }else{
        console.log('mauvais login ou password')
      }
    }
    signin()
  }

  if (user) {
    return (
      <Redirect to="/screen-source" />
    )
  }

//---------Signin--------
  return (
    <div className="Login-page" >
      
          {/* SIGN-IN */}

          <div className="Sign">
                  <Input 
                  className="Login-input" 
                  placeholder="arthur@lacapsule.com" 
                  onChange={(e) => setSigninLogin(e.target.value)}
                  value={signinLogin}
                  />

                  <Input.Password 
                  className="Login-input" 
                  placeholder="password"
                  onChange={(e) => setSigninPassword(e.target.value)} 
                  value={signinPassword}
                  />
            

        <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignIn()}>Sign-in</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
            {error ? <Alert message="User already exist..." type="error" /> : ''}
                  
                  <Input 
                  className="Login-input" 
                  placeholder="arthur@gmail.com" 
                  onChange={(e) => setSignupLogin(e.target.value)}
                  value={signupLogin}
                  />
                  <Input.Password 
                  className="Login-input" 
                  placeholder="password" 
                  onChange={(e) => setSignupPassword(e.target.value)}
                  value={signupPassword}
                  />

        <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignUp() }>Sign-up</Button>

          </div>

      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getToken: function (token) {
      dispatch({ type: 'getToken', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);