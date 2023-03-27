import { DateTime, QuarterNumbers, WeekNumbers } from 'luxon';
import { Quarter } from '../../../types/Quarter/Quarter';
import { QuarterMonth } from '../../../types/Quarter/QuarterMonth';

function getLastWeekOfYear(year: number): WeekNumbers {
  const lastDay = DateTime.fromObject({ year }).endOf('year');
  const weekBefore = lastDay.minus({ week: 1 });
  return weekBefore.weekNumber;
}

function firstWeekOfMonthHasMoreDaysInPreviousMonth(startMonth: DateTime) {
  // StartMonth should be the first day of the month.
  return (
    DateTime.fromObject({
      weekYear: startMonth.year,
      weekNumber: startMonth.weekNumber,
      weekday: 4,
    }).month < startMonth.month
  );
}

export function getQuarterData(year: number, quarter: QuarterNumbers): Quarter {
  let months: QuarterMonth[] = [];

  let startMonth = DateTime.fromObject({ month: quarter * 3 - 2, year });
  let endMonth = startMonth.plus({ month: 2 }).endOf('month');

  let startWeek = startMonth.weekNumber;
  let endWeek = endMonth.weekNumber;

  if (firstWeekOfMonthHasMoreDaysInPreviousMonth(startMonth)) {
    startWeek++;
  }

  /* Special case: if endWeek is 1 that means that last day of the year falls into first 
  week of next. Then set the endWeek to the last week in the correct. */
  if (endWeek === 1) endWeek = getLastWeekOfYear(year);

  // Check that the start dates week wouldnt be last years last week.
  if (startWeek > endWeek) startWeek = 1;

  let monthWithWeeks: QuarterMonth = {
    month: startMonth.month,
    weeks: [],
  };

  // Start iterating over weeks and assigning them to months
  for (let week = startWeek as WeekNumbers; week <= endWeek; week++) {
    const weekStart = DateTime.fromObject({ weekYear: year, weekNumber: week });
    const weekThursday = weekStart.plus({ day: 3 });
    const weekEnd = weekStart.plus({ day: 6 }).endOf('day');

    // We use Thursday here , because whatever month Thursday falls into has more of its days in that week
    const month = weekThursday.month;
    // console.log(month, weekStart.toISODate(), weekEnd.toISODate());
    if (month !== monthWithWeeks.month && month <= endMonth.month) {
      months.push(monthWithWeeks);
      monthWithWeeks = { month, weeks: [] };
    }
    monthWithWeeks.weeks.push({ week, startDate: weekStart, endDate: weekEnd });
  }
  if (monthWithWeeks.month <= endMonth.month) months.push(monthWithWeeks);
  return { quarter, year, months };
}
