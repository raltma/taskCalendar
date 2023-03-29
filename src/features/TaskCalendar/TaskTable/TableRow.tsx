import { QuarterWeek } from '../../../types/Quarter/QuarterWeek';
import { Task } from '../../../types/Task';
import { v4 } from 'uuid';
import CellWithHoverCard from './CellWithHoverCard';
import { dateFormat } from '../../../globals';

type TableRowProps = {
  task: Task;
  weeks: QuarterWeek[] | undefined;
  onClick: () => void;
};

/**
 *Represents a table row displaying task information and its associated calendar cells.
 *
 *@param {Task} props.task - The task object containing the task data to be displayed in the row.
 *@param {QuarterWeek[]} props.weeks - An array of QuarterWeek objects containing the week data
 *  to be displayed in the row.
 *@param {function} props.onClick - The event handler to be called when the row is clicked.
 *  It is used to select the task and open the modal to edit it.
 *@returns {JSX.Element} - A JSX element containing a table row with task information and its
 *  associated calendar cells.
 */
export const TableRow = ({ task, weeks, onClick }: TableRowProps) => {
  const getTaskInfoCells = () => (
    <>
      <td className="taskInfoCell" key={v4()}>
        {task.name}
      </td>
      <td className="taskInfoCell" key={v4()}>
        {task.interval.start.toFormat(dateFormat)}
      </td>
      <td className="taskInfoCell" key={v4()}>
        {task.interval.end.toFormat(dateFormat)}
      </td>
    </>
  );

  const getTaskCalendarCells = () => {
    return weeks?.map((week) => {
      if (week.interval.overlaps(task.interval)) {
        return <CellWithHoverCard task={task} key={v4()} />;
      }
      return <td key={v4()}></td>;
    });
  };
  return (
    <tr className="clickable" onClick={onClick}>
      {getTaskInfoCells()}
      {getTaskCalendarCells()}
    </tr>
  );
};
