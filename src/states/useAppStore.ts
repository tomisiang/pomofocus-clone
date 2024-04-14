import { create } from 'zustand'
import { combine, devtools, persist } from 'zustand/middleware'
import { defaultSettingState, useSettingsStore } from '.'
import type { AppStore } from '@/types/app'
import type { SettingsStore } from '@/types/settings'
import type { Task } from '@/types/tasks'

const defaultState: AppStore = {
  timeLeft: defaultSettingState['time']['pomodoro'],
  mode: 'pomodoro',
  selectedTask: null,
  timerState: 'pause',
  longBreakInterval: 1,
}

export const useAppStore = create(
  devtools(
    persist(
      combine(defaultState, (set, get) => ({
        setTimeLeft: () => {
          if (get().timeLeft <= 0) return

          set(prev => ({
            ...prev,
            timeLeft: prev.timeLeft - 1,
          }))
        },
        setMode: (
          mode: keyof SettingsStore['time'],
          timerState?: AppStore['timerState']
        ) => {
          const settingsTime = useSettingsStore.getState().time

          set(prev => ({
            ...prev,
            mode,
            timerState: timerState ?? 'start',
            timeLeft: settingsTime[mode],
            ...(timerState && { longBreakInterval: 1 }),
          }))
        },
        toggleTimerState: () => {
          set(prev => ({
            ...prev,
            timerState: prev.timerState === 'start' ? 'pause' : 'start',
          }))
        },
        setTimerState: (timerState: AppStore['timerState']) => {
          set(prev => ({
            ...prev,
            timerState,
          }))
        },
        isNextBreakLongBreak: () => {
          const settingsInterval = useSettingsStore.getState().longBreakInterval
          const index = get().longBreakInterval

          return settingsInterval === index
        },
        incrementLongBreakInterval: () => {
          const settingsInterval = useSettingsStore.getState().longBreakInterval
          const index = get().longBreakInterval
          const incrementedIndex = index + 1
          const nextIndex = index === settingsInterval ? 1 : incrementedIndex

          set(prev => ({
            ...prev,
            longBreakInterval: nextIndex,
          }))
        },
        setSelectedTask: (taskId: Task['id']) => {
          set(prev => ({ ...prev, selectedTask: taskId }))
        },
        progress: () => {
          const settingsTime = useSettingsStore.getState().time
          const { timeLeft, mode } = get()

          return 100 - (timeLeft / settingsTime[mode]) * 100
        },
        countDown: (): [number, number] => {
          const { timeLeft } = get()

          const minutes = Math.floor(timeLeft / 60)
          const remainingSeconds = timeLeft % 60

          return [minutes, remainingSeconds]
        },
      })),
      { name: 'app' }
    )
  )
)
