import Fab from '@mui/material/Fab';
import './quarterChooser.css';
import { QuarterNumbers } from 'luxon';
import { YearQuarter } from '../../../types/Quarter/YearQuarter';
import { Dispatch, SetStateAction } from 'react';

type QuarterChooserProps = {
  yearQuarter: YearQuarter;
  setYearQuarter: Dispatch<SetStateAction<YearQuarter>>;
};

/**
 * A component that allows users to choose a year and quarter.
 *
 * @param {YearQuarter} yearQuarter - The currently selected year and quarter.
 * @param {Dispatch<SetStateAction<YearQuarter>>} setYearQuarter - A function to
 * pass updated year and quarter up.
 * @returns {JSX.Element} - The QuarterChooser component.
 */
export const QuarterChooser = ({
  yearQuarter,
  setYearQuarter,
}: QuarterChooserProps) => {
  const increment = (): void => {
    let { year, quarter } = yearQuarter;
    if (quarter + 1 > 4) {
      quarter = 1 as QuarterNumbers;
      year++;
    } else {
      quarter = (quarter + 1) as QuarterNumbers;
    }
    setYearQuarter({ year, quarter });
  };

  const decrement = (): void => {
    let { year, quarter } = yearQuarter;
    if (quarter - 1 < 1) {
      quarter = 4 as QuarterNumbers;
      year = year - 1;
    } else {
      quarter = (quarter - 1) as QuarterNumbers;
    }
    setYearQuarter({ year, quarter });
  };

  return (
    <div className="quarterChooserContainer">
      <Fab size="medium" onClick={decrement} color="primary">
        &lt;
      </Fab>
      <div className="textContainer">
        <div>{yearQuarter.year}</div>
        Quarter {yearQuarter.quarter}
      </div>
      <Fab size="medium" onClick={increment} color="primary">
        &gt;
      </Fab>
    </div>
  );
};
