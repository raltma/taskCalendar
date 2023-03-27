import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Quarter } from '../../../types/Quarter/Quarter';
import { YearQuarter } from '../../../types/Quarter/YearQuarter';
import { Task } from '../../../types/Task';
import { getQuarterData } from './getQuarterData';
import { TableBody } from './TableBody/TableBody';
import { TableHeader } from './TableHeader/TableHeader';

import './taskTable.css';

type TaskTableProps = {
  yearQuarter: YearQuarter;
};

export const TaskTable = ({ yearQuarter }: TaskTableProps) => {
  const [quarterData, setQuarterData] = useState<Quarter>();
  const task: Task = {
    id: v4(),
    name: 'Test',
    description: 'Tere ma olen task mis on sisse kooditud ja testimiseks',
    startDate: DateTime.now().minus({ day: 50 }),
    endDate: DateTime.now().minus({ day: 8 }),
  };
  useEffect(() => {
    setQuarterData(getQuarterData(yearQuarter.year, yearQuarter.quarter));
  }, [yearQuarter]);
  return (
    <table>
      <TableHeader quarterData={quarterData} />
      <TableBody tasks={[task]} quarterData={quarterData} />
    </table>
  );
};
