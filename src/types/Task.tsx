import { Interval } from 'luxon';

export type Task = {
  id: string;
  interval: Interval;
  name: string;
  description: string;
};
