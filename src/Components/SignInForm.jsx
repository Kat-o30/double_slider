import React, { useState } from 'react';
import './SignInForm.css';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

function SignInForm() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'otp') {
      setOtp(value);
    }
  };



  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        onSignInSubmit();
        console.log('Recaptcha verified');
      },
      defaultCountry: 'IN',
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = '+91' + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log('OTP has been sent');
        setShowOtpForm(true);
      })
      .catch((error) => {
        console.log('SMS not sent');
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert('User is verified');
        setOtp('');
        setShowOtpForm(false);
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <body className='body'>
      <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id='background'>


        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>
              <Link to="/home">Sign Up</Link>
            </button>
          </form>
        </div>


        <div className="form-container sign-in-container">
          <form action="#" onSubmit={onSignInSubmit}>
            <h1>Sign in</h1>
            <p>Enter your phone number</p>
            <div id="sign-in-button"></div>
            <input
              type="number"
              name="mobile"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              value={mobile}
            />

            <button type='submit'>Sign In</button>

            {showOtpForm && (
              <div>
                <h2>Enter OTP</h2>
                <form action="" onSubmit={onSubmitOTP}>
                  <input
                    type="number"
                    name="otp"
                    placeholder="OTP Number"
                    required
                    onChange={handleChange}
                    value={otp}
                  />
                  <button>
                    <Link to="/home" id="signUp" type="submit">Submit</Link>
                  </button>
                </form>
              </div>
            )}
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className={`overlay-panel overlay-left ${isSignUpActive ? 'overlay-left-active' : ''}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className={`overlay-panel overlay-right ${isSignUpActive ? 'overlay-right-active' : ''}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </body>

  );
}

export default SignInForm;
