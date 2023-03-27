import { useState } from 'react';
import { QuarterChooser } from './QuarterChooser/QuarterChooser';
import { TaskTable } from './TaskTable/TaskTable';
import './taskCalendar.css';
import { YearQuarter } from '../../types/Quarter/YearQuarter';
import { QuarterNumbers } from 'luxon';

export const TaskCalendar = () => {
  const [yearQuarter, setYearQuarter] = useState<YearQuarter>({
    year: 2023,
    quarter: 1,
  });

  const handleQuarterChange = (newYear: number, newQuarter: QuarterNumbers) => {
    setYearQuarter({ year: newYear, quarter: newQuarter });
  };

  return (
    <div className="calendarContainer">
      <QuarterChooser onQuarterChange={handleQuarterChange} />
      <TaskTable yearQuarter={yearQuarter} />
    </div>
  );
};
