import { useEffect, useState } from 'react';
import { Quarter } from '../../../types/Quarter/Quarter';
import { YearQuarter } from '../../../types/Quarter/YearQuarter';
import { Task } from '../../../types/Task';
import { AddTask } from '../TaskModals/AddTask';
import { EditDeleteTask } from '../TaskModals/EditDeleteTask';
import { getQuarterData } from '../../../utils/getQuarterData';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

import './taskTable.css';

type TaskTableProps = {
  yearQuarter: YearQuarter;
};
/**
 *Displays a table of tasks for a given quarter and provides the ability to add and edit tasks.
 *
 *@param {Object} props.yearQuarter - An object representing the year and quarter to display tasks for.
 *@returns {JSX.Element} - A React component that displays a table of tasks and provides modals for adding/editing tasks.
 */
export const TaskTable = ({ yearQuarter }: TaskTableProps) => {
  const [quarterData, setQuarterData] = useState<Quarter>();
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
    setQuarterData(getQuarterData(yearQuarter.year, yearQuarter.quarter));
  }, [yearQuarter]);

  const selectTask = (task: Task) => {
    if (task !== undefined) {
      setSelectedTask(task);
      setEditFormOpen(true);
    }
  };
  return (
    <>
      <AddTask open={addFormOpen} setOpen={setAddFormOpen} />
      <EditDeleteTask
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        open={editFormOpen}
        setOpen={setEditFormOpen}
      />
      <table>
        <TableHeader
          addTaskButtonClick={setAddFormOpen}
          quarterData={quarterData}
        />
        <TableBody selectTask={selectTask} quarterData={quarterData} />
      </table>
    </>
  );
};
