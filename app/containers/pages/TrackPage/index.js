/*
 * HomePage
 *
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
*/

import _ from 'lodash';
import React from 'react';
import { Chart } from 'react-charts';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase';

import Container from 'components/Container';
import Button from 'components/Button';

import {
  currentTimeSeconds,
  formatUnixTimestamp,
  convertDateToPath,
} from 'utils/time';

const INCIDENT_COLORS = {
  emergency: 'red',
  theft: 'yellow',
  intrusion: 'blue',
};

export const getStoragePathFromItem = item =>
  convertDateToPath(
    formatUnixTimestamp(item.date_created_timestamp, 'storage_date')
  );

const makeDatesFromPastWeek = () =>
  new Array(7)
    .fill(0)
    .map((_, idx) =>
      formatUnixTimestamp(
        currentTimeSeconds() - (7 + idx * 24 * 60 * 60),
        'shorter_date'
      )
    )
    .reduce((acc, date) => {
      acc[date] = [];
      return acc;
    }, {});

const getDateFromIncident = i =>
  formatUnixTimestamp(i.value.reported_seconds, 'shorter_date');

const getIncidentsForDate = (incidents, date) =>
  _.filter(incidents, i => getDateFromIncident(i) === date).length;

const makeIncidentSummaries = (incidents, date) => {
  const incidentMap = _.groupBy(incidents, 'value.type');

  // for each date, return a total where
  return _.map(incidentMap, (i, type) => ({
    x: type,
    y: getIncidentsForDate(i, date),
  }));
};

const makeIncidentsForWeek = (obj, type, dates) => {
  return _.keys(dates).map(date => {
    return {
      x: date,
      y: _.filter(
        obj,
        i => i.value.type === type && getDateFromIncident(i) === date
      ).length,
    };
  });
};

const makeHistogramOfIncidents = object => {
  const dates = makeDatesFromPastWeek();
  const incidentMap = _.groupBy(object, 'value.type');

  return _.map(incidentMap, (incident, type) => ({
    label: type,
    datums: makeIncidentsForWeek(object, type, dates),
  }));
};

const makeIncidentsByDay = incidents => {
  const dates = makeDatesFromPastWeek();
  return _.map(dates, (listValues, date) => ({
    label: date,
    datums: makeIncidentSummaries(incidents, date),
  }));
};

const TrackPage = () => {
  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { position: 'bottom', type: 'linear', stacked: true },
    ],
    []
  );
  useFirebaseConnect('incident');

  const [isOn, toggleView] = React.useState(false);
  const incidents = useSelector(state => {
    return state.get('firebase').ordered.incident;
  });

  const data = React.useMemo(
    () => {
      if (incidents) {
        return isOn
          ? makeIncidentsByDay(incidents)
          : makeHistogramOfIncidents(incidents);
      }

      return [];
    },
    [incidents, isOn]
  );
  return (
    <Container type="empty">
      {incidents && data.length > 0 ? (
        <Container padded style={{ height: '300px', width: '100%' }}>
          <Chart
            data={data}
            series={series}
            axes={axes}
            tooltip
            getSeriesStyle={s => ({ color: s.originalSeries.color })}
          />
          <Container horizontal end>
            <Button
              handleClick={() => toggleView(!isOn)}
              width="25%"
              text={isOn ? 'Type' : 'Day'}
              type={isOn ? 'secondary' : 'cancel'}
            />
          </Container>
        </Container>
      ) : null}
    </Container>
  );
};

export default TrackPage;
