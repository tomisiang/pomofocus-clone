import { create } from 'zustand'
import { combine, devtools, persist } from 'zustand/middleware'
import uuid from 'react-uuid'
import type { Task, TasksStore } from '@/types/tasks'

const defaultState: TasksStore = {
  tasks: [],
}

export const useTasksStore = create(
  devtools(
    persist(
      combine(defaultState, (set, get) => ({
        addTask: (task: Omit<Task, 'id'>) => {
          set(prev => ({
            ...prev,
            tasks: [...prev.tasks, { ...task, id: uuid() }],
          }))
        },
        updateTask: (task: Task) => {
          const newList = get().tasks.map(e => {
            if (e.id === task.id) {
              return task
            }
            return e
          })
          set(prev => ({ ...prev, tasks: newList }))
        },
        deleteTask: (task: Task) => {
          const newList = get().tasks.filter(e => e.id !== task.id)
          set(prev => ({ ...prev, tasks: newList }))
        },
        incrementTaskCompletedPomo: (taskId: Task['id']) => {
          const newList = get().tasks.map(e => {
            if (e.id === taskId) {
              return { ...e, completed: e.completed + 1 }
            }
            return e
          })
          set(prev => ({ ...prev, tasks: newList }))
        },
      })),
      { name: 'tasks' }
    )
  )
)
