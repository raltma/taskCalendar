import { MonthNumbers } from 'luxon';
import { QuarterWeek } from './QuarterWeek';

export type QuarterMonth = {
  month: MonthNumbers;
  weeks: QuarterWeek[];
};
