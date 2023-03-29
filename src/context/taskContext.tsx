import * as React from 'react';
import { v4 } from 'uuid';
import { Task } from '../types/Task';

export const TaskContext = React.createContext<TaskContextType | null>(null);

/**
 *TaskContext provides a context for managing a list of tasks and
 *related actions like adding, editing and deleting tasks.
 *
 *@property {Task[]} tasks - The list of tasks
 *@property {function} editTask - A function to edit a task in the list
 *@property {function} addTask - A function to add a task to the list
 *@property {function} deleteTask - A function to delete a task from the list
 **/
export type TaskContextType = {
  tasks: Task[];
  editTask: (task: Task) => void;
  addTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

type TaskProviderProps = {
  children: React.ReactNode;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const addTask = (task: Task) => {
    //Generate new ID for submitted task and then add it to tasks
    if (tasks.length < 10)
      setTasks((oldTasks) => [...oldTasks, { ...task, id: v4() }]);
  };

  const editTask = (task: Task) => {
    setTasks(
      tasks.map((currentTask) =>
        task.id === currentTask.id ? task : currentTask
      )
    );
  };

  const deleteTask = (task: Task) => {
    setTasks(tasks.filter((currentTask) => task.id !== currentTask.id));
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
