import { useState } from 'react';
import Fab from '@mui/material/Fab';
import './quarterChooser.css';
import { DateTime, QuarterNumbers } from 'luxon';

type QuarterChooserProps = {
  onQuarterChange: (year: number, quarter: QuarterNumbers) => void;
};

export const QuarterChooser = ({ onQuarterChange }: QuarterChooserProps) => {
  const [quarter, setQuarter] = useState(DateTime.now().quarter);
  const [year, setYear] = useState(DateTime.now().year);

  const handleQuarterChange = (newYear: number, newQuarter: QuarterNumbers) => {
    setYear(newYear);
    setQuarter(newQuarter);
    onQuarterChange(newYear, newQuarter);
  };

  const increment = (): void => {
    let newQuarter = quarter;
    let newYear = year;
    if (quarter + 1 > 4) {
      newQuarter = 1;
      newYear = year + 1;
    } else {
      newQuarter = (quarter + 1) as QuarterNumbers;
    }
    handleQuarterChange(newYear, newQuarter as QuarterNumbers);
  };

  const decrement = (): void => {
    let newQuarter = quarter;
    let newYear = year;
    if (quarter - 1 < 1) {
      newQuarter = 4;
      newYear = year - 1;
    } else {
      newQuarter = (quarter - 1) as QuarterNumbers;
    }
    handleQuarterChange(newYear, newQuarter as QuarterNumbers);
  };

  return (
    <div className="quarterChooserContainer">
      <Fab size="medium" onClick={decrement} color="primary">
        &lt;
      </Fab>
      <div className="textContainer">
        <div>{year}</div>
        Quarter {quarter}
      </div>
      <Fab size="medium" onClick={increment} color="primary">
        &gt;
      </Fab>
    </div>
  );
};
