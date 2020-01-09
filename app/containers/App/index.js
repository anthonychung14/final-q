/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { withState, compose } from 'recompose';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';

import ReportIncident from 'containers/ReportIncident/Loadable';
import TrackPage from 'containers/pages/TrackPage/loadable';
import AboutPage from 'containers/pages/AboutPage/loadable';
import RegisterUnit from 'containers/pages/RegisterUnit/loadable';

import Login from 'components/Login';
import AppBar from 'components/AppBar';
import LeftDrawer from 'components/LeftDrawer';
import Container from 'components/Container';

import { connectActiveMode } from 'selectors/skill_mode';
import { getAuth } from 'selectors/firebase';

import GlobalStyle from '../../global-styles';

const withToggleOpenState = withState(
  'drawerOpen',
  'handleDrawerToggle',
  false
);

const MAP = {
  about: {
    headerText: 'About Centinel',
    Component: AboutPage,
  },
  track: {
    headerText: 'Track Incidents',
    Component: TrackPage,
  },
  report: {
    headerText: 'Report an Incident',
    Component: ReportIncident,
  },
  register: {
    headerText: 'Register',
    Component: RegisterUnit,
  },
};

const getProps = page => {
  return MAP[page] || MAP.consume;
};

const PageDisplayer = ({ activeMode, auth, firebase }) => {
  const { headerText, Component } = getProps(activeMode);

  return (
    <Container type="empty">
      {isLoaded(auth) && isEmpty(auth) ? (
        <Login firebase={firebase} />
      ) : (
        <Container type="page" headerText={headerText}>
          <Component />
        </Container>
      )}
    </Container>
  );
};

const PageContainer = compose(
  firebaseConnect(),
  connect(state => ({ auth: getAuth(state) })),
  connectActiveMode
)(PageDisplayer);

const Body = drawerProps => (
  <div style={{ height: '100%', width: '100%' }}>
    <AppBar {...drawerProps} />
    <LeftDrawer {...drawerProps}>
      <PageContainer />
    </LeftDrawer>
    <GlobalStyle />
  </div>
);

const BodyWithDrawer = withToggleOpenState(Body);

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Centinel" defaultTitle="Centinel">
        <meta name="description" content="Automate Nutrition" />
      </Helmet>
      <BodyWithDrawer />
    </div>
  );
}
