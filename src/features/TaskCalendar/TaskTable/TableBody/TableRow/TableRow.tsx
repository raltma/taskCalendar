import { Interval } from 'luxon';
import { QuarterWeek } from '../../../../../types/Quarter/QuarterWeek';
import { Task } from '../../../../../types/Task';
import { v4 } from 'uuid';
import CellWithHoverCard from './CellWithHoverCard/CellWithHoverCard';

type TableRowProps = {
  task: Task;
  weeks: QuarterWeek[] | undefined;
};

export const TableRow = ({ task, weeks }: TableRowProps) => {
  const getTaskInfoCells = () => (
    <>
      <td key={v4()}>{task.name}</td>
      <td key={v4()}>{task.startDate.toLocaleString()}</td>
      <td key={v4()}>{task.endDate.toLocaleString()}</td>
    </>
  );

  const getTaskCalendarCells = () => {
    return weeks?.map((week) => {
      const weekInterval = Interval.fromDateTimes(week.startDate, week.endDate);
      const taskInterval = Interval.fromDateTimes(task.startDate, task.endDate);
      if (weekInterval.overlaps(taskInterval)) {
        return <CellWithHoverCard task={task} key={v4()} />;
      }
      return <td key={v4()}></td>;
    });
  };
  return (
    <tr>
      {getTaskInfoCells()}
      {getTaskCalendarCells()}
    </tr>
  );
};
