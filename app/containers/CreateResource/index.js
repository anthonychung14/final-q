/**
 * Allows you to create a row in an arbitrary Airtable
 *
 * @flow
 * @format
 */

import * as React from 'react';

import Form from 'components/Form';
import Container from 'components/Container';

import { withCreateResource } from 'components/ResourceSelector/enhancers';
// import actions from 'actions';
import resources from 'resources';

class ResourceCreatePage extends React.Component<Props> {
  submitCallback = values => {
    const { createResource, resourceType } = this.props;
    createResource(resourceType, values);
  };

  render() {
    const { resourceType, submitLabel = 'Create Incident Report' } = this.props;

    const resource = resources[resourceType];
    return (
      <Container>
        <Form
          fields={resource.fields}
          form={resourceType}
          submitCallback={this.submitCallback}
          submitLabel={submitLabel}
        />
      </Container>
    );
  }
}

type Props = {
  fields: Array<Object>,
  resourceType: string,
  title: string,
};

export default withCreateResource(ResourceCreatePage);
