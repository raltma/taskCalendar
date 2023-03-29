import { Interval, QuarterNumbers } from 'luxon';
import { QuarterMonth } from './QuarterMonth';

export type Quarter = {
  year: number;
  quarter: QuarterNumbers;
  months: QuarterMonth[];
  quarterInterval?: Interval;
};
