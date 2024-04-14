import { SettingsStore } from './settings'
import type { Task } from './tasks'

export interface AppStore {
  /** Seconds */
  timeLeft: number
  mode: keyof SettingsStore['time']
  selectedTask: Task['id'] | null
  timerState: 'pause' | 'start'
  longBreakInterval: number
}
