import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
// import GoogleButton from 'react-google-button' // optional

export const LoginPage = ({ firebase, auth }) => (
  <div>
    <button // <GoogleButton/> button can be used instead
      onClick={() => {
        firebase.login({ provider: 'google', type: 'redirect' });
      }}
      type="button"
    >
      Login With Google
    </button>
    <div>
      <h2>Auth</h2>
      {!isLoaded(auth) ? (
        <span>Loading...</span>
      ) : isEmpty(auth) ? (
        <span>Not Authed</span>
      ) : (
        <pre>{JSON.stringify(auth, null, 2)}</pre>
      )}
    </div>
  </div>
);

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(withFirebase)(LoginPage);