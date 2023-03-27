import { useEffect, useState } from 'react';
import { Quarter } from '../../../../types/Quarter/Quarter';
import { QuarterWeek } from '../../../../types/Quarter/QuarterWeek';
import { Task } from '../../../../types/Task';
import { TableRow } from './TableRow/TableRow';

type TableBodyProps = {
  quarterData: Quarter | undefined;
  tasks: Task[];
};

export const TableBody = ({ tasks, quarterData }: TableBodyProps) => {
  const [weeks, setWeeks] = useState<QuarterWeek[]>();
  useEffect(() => {
    setWeeks(quarterData?.months.flatMap((month) => month.weeks));
  },[quarterData]);
  return (
    <tbody>
      {tasks.map((task) => (
        <TableRow task={task} weeks={weeks} />
      ))}
    </tbody>
  );
};
