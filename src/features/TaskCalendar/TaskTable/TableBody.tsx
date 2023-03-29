import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { TaskContext, TaskContextType } from '../../../context/taskContext';
import { Quarter } from '../../../types/Quarter/Quarter';
import { QuarterWeek } from '../../../types/Quarter/QuarterWeek';
import { Task } from '../../../types/Task';
import { TableRow } from './TableRow';

type TableBodyProps = {
  quarterData: Quarter | undefined;
  selectTask: (task: Task) => void;
};

/**
 *Component for rendering the body of the task table.
 *
 *@param {Quarter | undefined} props.quarterData - The data for the current quarter.
 *@param {function} props.setSelectedTask - The function to set the currently selected task
 *  for editing.
 *@returns {JSX.Element} - The table body element.
 */
export const TableBody = ({ quarterData, selectTask }: TableBodyProps) => {
  const [weeks, setWeeks] = useState<QuarterWeek[]>();
  const { tasks } = useContext(TaskContext) as TaskContextType;
  useEffect(() => {
    setWeeks(quarterData?.months.flatMap((month) => month.weeks));
  }, [quarterData]);
  return (
    <tbody>
      {tasks.map((task) => (
        <TableRow
          key={v4()}
          onClick={() => {
            selectTask(task);
          }}
          task={task}
          weeks={weeks}
        />
      ))}
    </tbody>
  );
};
