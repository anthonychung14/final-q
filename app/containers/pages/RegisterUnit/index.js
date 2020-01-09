/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
*/

import React from 'react';
import { Text } from 'react-native';

import Container from 'components/Container';
import Subheader from 'components/Subheader';
import CreateResource from '../../CreateResource';

const RegisterUnit = () => (
  <Container>
    <Subheader
      text="Directions"
      renderText={() => (
        <Container padded paddedBottom>
          <Text>Register your unit with your account</Text>
        </Container>
      )}
    />

    <CreateResource resourceType={'userFob'} submitLabel="Register unit" />
  </Container>
);

export default RegisterUnit;
