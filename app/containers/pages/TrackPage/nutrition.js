import _ from 'lodash';

// TODO: nutrition specific selectors must be moved into their own module
import { getNutritionConsumed } from 'selectors/firebase';
import {
  convertToUnixFromDate,
  currentTimeSeconds,
  formatUnixTimestamp,
  convertDateToPath,
} from 'utils/time';

const getConsumedFromDate = (date, object) =>
  _.defaultTo(_.get(object, `2020.${convertDateToPath(date)}`), {});

const makeMacroSummaries = (date, object) => {
  // { 2020: { 1: { 04: { stuff, stuff, stuff } } } }

  const consumedOnDate = getConsumedFromDate(date, object);

  return ['protein', 'fat', 'carb'].map(m => ({
    x: m,
    y: totalForMacroInDate(date, consumedOnDate, m),
  }));
};

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

const makeMacrosForWeek = (object, m, dates) => {
  //

  // for each date, return a total where
  return _.keys(dates).map(date => {
    const consumedOnDate = getConsumedFromDate(date, object);
    return {
      x: date,
      y: totalForMacroInDate(date, consumedOnDate, m),
    };
  });
};

// splits data so that secondary axes is macros + histogram of dates
const makeDataByDay = object => {
  const dates = makeDatesFromPastWeek();
  return _.map(dates, (currArr, shorterDateKey) => ({
    label: shorterDateKey,
    datums: currArr.concat(makeMacroSummaries(shorterDateKey, object)),
  }));
};

// splits data so that secondary is dates, histogram of macros
const makeHistogramOfMacros = object => {
  const dates = makeDatesFromPastWeek();
  return ['protein', 'fat', 'carb'].map(m => ({
    label: m,
    datums: makeMacrosForWeek(object, m, dates),
  }));
};

// splits data so that secondary axes is macros + histogram of dates
const makeDataByDay = object => {
  const dates = makeDatesFromPastWeek();
  return _.map(dates, (currArr, shorterDateKey) => ({
    label: shorterDateKey,
    datums: currArr.concat(makeMacroSummaries(shorterDateKey, object)),
  }));
};
