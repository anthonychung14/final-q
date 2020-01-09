/**
 * Creates a new incident
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'theft';
const FIELDS = [
  {
    name: 'package type',
    displayName: 'deliverer',
    type: 'checkbox',
    label: 'Delivery Carrier',
    values: ['Amazon', 'UPS', 'FedEx', 'Other'],
    required: true,
  },
  {
    name: 'description',
    type: 'textArea',
    label: 'optional description of theft',
  },
];

const THEFT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default THEFT;
