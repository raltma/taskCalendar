import { DateTime, WeekNumbers } from 'luxon';

export type QuarterWeek = {
  week: WeekNumbers;
  startDate: DateTime;
  endDate: DateTime;
};
