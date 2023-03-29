import { Card, CardContent } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { dateFormat } from '../../../globals';
import { Task } from '../../../types/Task';

type CellWithHoverCardProps = {
  task: Task;
};

/**
 *Represents a cell in a table with a hoverable card displaying task details.
 *
 *@param {Task} props.task - The task object containing the task data to be displayed
 *   on the card.
 *@returns {JSX.Element} - A JSX element containing a table cell with a hoverable card.
 */

export default function CellWithHoverCard({ task }: CellWithHoverCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <td
      className="hasTask"
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Card sx={{ minWidth: 275, maxWidth: 370 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {task?.name}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              {task?.interval.start.toFormat(dateFormat)} -{' '}
              {task?.interval.end.toFormat(dateFormat)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {task?.description}
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </td>
  );
}
