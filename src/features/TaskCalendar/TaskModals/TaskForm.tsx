import { TextField } from '@mui/material';
import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import { PickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue';
import { DateTime } from 'luxon';
import React, { Dispatch, SetStateAction } from 'react';
import { dateFormat } from '../../../globals';
import { Task } from '../../../types/Task';

type TaskFormProps = {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
};
const marginStyle = {
  marginBottom: '1rem',
};

/**
 *Component for displaying a form for creating or editing a task.
 *
 *@param {Task} props.task - The task object to be edited or
 *  the initial task object for creating a new task.
 *@param {Function} props.setTask - The function to update the task object.
 *@return {JSX.Element} - Returns the JSX element that represents the task form.
 */
export const TaskForm = ({ task, setTask }: TaskFormProps) => {
  /* These setDate functions are to prevent interval from breaking when
    either start larger than end or when end is smaller than start */
  const setEndDate: PickerChangeHandler<
    DateTime | null,
    DateValidationError
  > = (newDate) => {
    let newStart = task.interval.start;
    if (newDate !== null && newDate < task.interval.start) {
      newStart = newDate;
    }
    setTask((oldTask) => ({
      ...oldTask,
      interval: oldTask.interval.set({
        start: newStart ?? undefined,
        end: newDate ?? undefined,
      }),
    }));
  };
  const setStartDate: PickerChangeHandler<
    DateTime | null,
    DateValidationError
  > = (newDate) => {
    let newEnd = task.interval.start;
    if (newDate !== null && newDate > task.interval.end) {
      newEnd = newDate;
    }
    setTask((oldTask) => ({
      ...oldTask,
      interval: oldTask.interval.set({
        start: newDate ?? undefined,
        end: newEnd ?? undefined,
      }),
    }));
  };
  return (
    <div>
      <TextField
        value={task.name}
        onChange={(event) =>
          setTask((oldTask) => ({ ...oldTask, name: event.target.value }))
        }
        label="Name"
        variant="filled"
        color="primary"
        fullWidth
        sx={marginStyle}
      />
      <TextField
        value={task.description}
        onChange={(event) =>
          setTask((oldTask) => ({
            ...oldTask,
            description: event.target.value,
          }))
        }
        label="Description"
        multiline
        rows={4}
        variant="filled"
        fullWidth
        sx={marginStyle}
      />
      <DatePicker
        value={task.interval.start}
        onChange={setStartDate}
        label="Start Date"
        sx={marginStyle}
        format={dateFormat}
      />
      <DatePicker
        value={task.interval.end}
        onChange={setEndDate}
        label="End Date"
        sx={marginStyle}
        format={dateFormat}
      />
    </div>
  );
};
