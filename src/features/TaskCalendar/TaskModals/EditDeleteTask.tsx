import { Box, Button, Modal, Typography } from '@mui/material';
import { Interval, DateTime } from 'luxon';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { TaskContext, TaskContextType } from '../../../context/taskContext';
import { Task } from '../../../types/Task';
import { TaskForm } from './TaskForm';

type TaskFormProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedTask?: Task;
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>;
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
  textOverflow: 'ellipsis',
  overflow: 'hidden',
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
 *Component for editing and deleting a task in a modal.
 *
 *@param {boolean} props.open - Controls whether the modal is open or not
 *@param {function} props.setOpen - Function to set the open state of the modal
 *@param {object} [props.selectedTask] - The task to edit or delete
 *@param {function} props.setSelectedTask - Function to set the selected task state
 *@returns {JSX.Element} - The EditDeleteTask component
 */
export const EditDeleteTask = ({
  open,
  setOpen,
  selectedTask,
  setSelectedTask,
}: TaskFormProps) => {
  const [task, setTask] = useState<Task>(selectedTask ?? initialTask);
  const { editTask, deleteTask } = useContext(TaskContext) as TaskContextType;

  useEffect(() => {
    if (selectedTask !== undefined) setTask(selectedTask);
  }, [selectedTask]);

  const onEdit = () => {
    if (task !== undefined) editTask(task);
    setOpen(false);
    setSelectedTask(undefined);
    setTask(initialTask);
  };

  const onDelete = () => {
    if (task !== undefined) deleteTask(task);
    setOpen(false);
    setSelectedTask(undefined);
    setTask(initialTask);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h5" mb={1}>
          Edit task: "{selectedTask?.name}"
        </Typography>

        <TaskForm task={task} setTask={setTask} />
        <Button variant="contained" onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          sx={{ marginLeft: '1rem' }}
        >
          Delete
        </Button>
      </Box>
    </Modal>
  );
};
