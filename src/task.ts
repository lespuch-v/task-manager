export interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
  subtasks?: Task[];
  newSubtaskTitle?: string;
}
