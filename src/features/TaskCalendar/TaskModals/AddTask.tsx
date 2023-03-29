import { Box, Button, Modal, Typography } from '@mui/material';
import { Interval, DateTime } from 'luxon';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { v4 } from 'uuid';
import { TaskContext, TaskContextType } from '../../../context/taskContext';
import { Task } from '../../../types/Task';
import { TaskForm } from './TaskForm';

type TaskFormProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0a0a0a',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 *The initial state of the task object used also to reset the task form.
 */
const initialTask: Task = {
  id: v4(),
  name: '',
  description: '',
  interval: Interval.fromDateTimes(DateTime.now(), DateTime.now()),
};

/**
 *A modal component for adding a new task.
 *
 *@param {boolean} props.open - Indicates whether the modal is open or not.
 *@param {function} props.setOpen - The state update function for opening/closing the modal.
 *@returns The AddTask component.
 */
export const AddTask = ({ open, setOpen }: TaskFormProps) => {
  const [task, setTask] = useState<Task>(initialTask);
  const { addTask } = useContext(TaskContext) as TaskContextType;

  const onSubmit = () => {
    if (task !== undefined) addTask(task);
    setOpen(false);
    setTask(initialTask);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h5" mb={1}>
          Add a task
        </Typography>
        <TaskForm task={task} setTask={setTask} />
        <Button variant="contained" onClick={onSubmit}>
          Add Task
        </Button>
      </Box>
    </Modal>
  );
};
