/**
 * Creates a new incident
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'emergency';
const FIELDS = [
  {
    name: 'media',
    type: 'media',
    label: 'a helpful picture',
  },
  {
    name: 'homeless outreach team',
    type: 'phoneNumber',
    label: 'homeless outreach team',
    number: '14153557401',
  },
  {
    name: 'police',
    type: 'phoneNumber',
    label: 'police',
    number: '911',
  },
];

const EMERGENCY = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default EMERGENCY;
