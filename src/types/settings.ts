export interface Time {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

export interface SettingsStore {
  time: Time
  names: {
    [T in keyof Time]: string
  }
  longBreakInterval: number
}
