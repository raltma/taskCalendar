import { useState } from 'react';
import { QuarterChooser } from './QuarterChooser/QuarterChooser';
import { TaskTable } from './TaskTable/TaskTable';
import './taskCalendar.css';
import { YearQuarter } from '../../types/Quarter/YearQuarter';
import { DateTime } from 'luxon';
import { TaskProvider } from '../../context/taskContext';

/**
 * A component that displays a calendar view of tasks by quarter.
 *
 * @return {JSX.Element} The rendered calendar view of tasks.
 */
export const TaskCalendar = () => {
  const [yearQuarter, setYearQuarter] = useState<YearQuarter>({
    quarter: DateTime.now().quarter,
    year: DateTime.now().year,
  });

  return (
    <TaskProvider>
      <div className="calendarContainer">
        <QuarterChooser
          yearQuarter={yearQuarter}
          setYearQuarter={setYearQuarter}
        />
        <TaskTable yearQuarter={yearQuarter} />
      </div>
    </TaskProvider>
  );
};
