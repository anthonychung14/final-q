/**
 * Creates a new userFob registration
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'userFob';
const FIELDS = [
  {
    name: 'unit_number',
    displayName: '#',
    type: 'integer',
    label: 'Unit number of user',
    required: true,
    validate: [
      value => (value >= 800 && value < 100 ? 'Enter a valid unit' : undefined),
    ],
  },
  {
    name: 'fob_id',
    displayName: '#',
    type: 'integer',
    label: 'fob actively used',
    required: true,
  },
  {
    name: 'spare_fob_id',
    displayName: '#',
    type: 'integer',
    label: 'fob actively used',
  },
];

const UserFob = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default UserFob;
