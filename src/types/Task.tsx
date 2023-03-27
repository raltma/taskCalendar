import { DateTime } from 'luxon';

export type Task = {
  id: string;
  startDate: DateTime;
  endDate: DateTime;
  name: string;
  description: string;
};
