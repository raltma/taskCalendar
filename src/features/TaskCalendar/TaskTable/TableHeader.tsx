import { DateTime } from 'luxon';
import { Quarter } from '../../../types/Quarter/Quarter';
import { QuarterMonth } from '../../../types/Quarter/QuarterMonth';
import { QuarterWeek } from '../../../types/Quarter/QuarterWeek';
import { v4 as uuidv4 } from 'uuid';
import { Fab, Typography } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TaskContext, TaskContextType } from '../../../context/taskContext';

type TableHeaderProps = {
  quarterData: Quarter | undefined;
  addTaskButtonClick: Dispatch<SetStateAction<boolean>>;
};

/**
 *Component for the table header of the quarter planner.
 *
 *@param {Quarter | undefined} props.quarterData - The quarter data to display in the header.
 *@param {Dispatch<SetStateAction<boolean>>} props.addTaskButtonClick -
 *   Function to handle clicking the "Add Task" button.
 *@returns {JSX.Element} The table header component.
 */
export const TableHeader = ({
  quarterData,
  addTaskButtonClick,
}: TableHeaderProps) => {
  const [weeks, setWeeks] = useState(
    quarterData?.months.flatMap((month) => month.weeks)
  );
  const { tasks } = useContext(TaskContext) as TaskContextType;

  useEffect(() => {
    setWeeks(quarterData?.months.flatMap((month) => month.weeks));
  }, [quarterData]);
  return (
    <thead>
      <tr>
        <td colSpan={3} className="noBorder">
          {tasks.length < 10 && (
            <Fab
              variant="extended"
              color="primary"
              onClick={() => addTaskButtonClick(true)}
            >
              <Typography variant="button">+ Add Task</Typography>
            </Fab>
          )}
        </td>
        {quarterData?.months.map((month: QuarterMonth) => (
          <td key={uuidv4()} colSpan={month.weeks.length}>
            {DateTime.fromObject({ month: month.month }).toFormat('MMMM')}
          </td>
        ))}
      </tr>

      <tr>
        <td>Task</td>
        <td>Start</td>
        <td>End</td>
        {weeks?.map((week: QuarterWeek) => (
          <td key={uuidv4()}>{week.week}</td>
        ))}
      </tr>
    </thead>
  );
};
