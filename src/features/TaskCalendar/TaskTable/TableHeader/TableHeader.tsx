import { DateTime } from 'luxon';
import { Quarter } from '../../../../types/Quarter/Quarter';
import { QuarterMonth } from '../../../../types/Quarter/QuarterMonth';
import { QuarterWeek } from '../../../../types/Quarter/QuarterWeek';
import { v4 as uuidv4 } from 'uuid';

type TableHeaderProps = {
  quarterData: Quarter | undefined;
};

export const TableHeader = ({ quarterData }: TableHeaderProps) => {
  const weeks = quarterData?.months.flatMap((month) => month.weeks);
  return (
    <thead>
      <tr key={uuidv4()}>
        <td key={uuidv4()} colSpan={3} className="noBorder"></td>
        {quarterData?.months.map((month: QuarterMonth) => (
          <td key={uuidv4()} colSpan={month.weeks.length}>
            {DateTime.fromObject({ month: month.month }).toFormat('MMMM')}
          </td>
        ))}
      </tr>

      <tr key={uuidv4()}>
        <td key={uuidv4()}>Task</td>
        <td key={uuidv4()}>Start</td>
        <td key={uuidv4()}>End</td>
        {weeks?.map((week: QuarterWeek) => (
          <td key={uuidv4()}>{week.week}</td>
        ))}
      </tr>
    </thead>
  );
};
