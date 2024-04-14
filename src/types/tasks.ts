export interface Task {
  id: string
  title: string
  notes?: string
  total: number
  completed: number
  isCompleted: boolean
}

export interface TasksStore {
  tasks: Task[]
}
