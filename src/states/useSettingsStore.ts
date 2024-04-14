import { create } from 'zustand'
import { combine, devtools, persist } from 'zustand/middleware'
import { getSec } from '@/helpers'
import type { SettingsStore } from '@/types/settings'

export const defaultSettingState: SettingsStore = {
  time: {
    pomodoro: getSec(25),
    shortBreak: getSec(5),
    longBreak: getSec(15),
  },
  names: {
    pomodoro: 'Pomodoro',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  },
  longBreakInterval: 4,
}

export const useSettingsStore = create(
  devtools(
    persist(
      combine(defaultSettingState, set => ({
        setTime: (time: keyof SettingsStore['time'], value: number) => {
          set(prev => ({ ...prev, time: { ...prev.time, [time]: value } }))
        },
      })),
      { name: 'settings' }
    )
  )
)
