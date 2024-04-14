import { useEffect, useRef } from 'react'
import { useAppStore, useTasksStore } from '@/states'
import toast from 'react-hot-toast'

export const useAppClock = () => {
  const {
    setTimeLeft,
    timeLeft,
    setMode,
    mode,
    timerState,
    setTimerState,
    isNextBreakLongBreak,
    incrementLongBreakInterval,
    selectedTask,
  } = useAppStore()

  const incrementTaskCompletedPomo = useTasksStore(
    state => state.incrementTaskCompletedPomo
  )

  // App Clock
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    if (timerState === 'start') {
      intervalId = setInterval(setTimeLeft, 1000)
    }

    return () => clearInterval(intervalId)
  }, [setTimeLeft, timerState])

  // Mode switcher
  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === 'pomodoro') {
        if (selectedTask) incrementTaskCompletedPomo(selectedTask)
        return setMode(isNextBreakLongBreak() ? 'longBreak' : 'shortBreak')
      }

      incrementLongBreakInterval()
      setMode('pomodoro')
    }
  }, [
    incrementLongBreakInterval,
    incrementTaskCompletedPomo,
    isNextBreakLongBreak,
    mode,
    selectedTask,
    setMode,
    timeLeft,
  ])

  const isInit = useRef(false)

  // Toast
  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true
      return
    }

    switch (timerState) {
      case 'pause':
        toast('Pomodoro is paused')
        break
      default:
        toast('Pomodoro has started')
    }
  }, [timerState])

  // Pause on unmount / exit
  useEffect(() => {
    return () => setTimerState('pause')
  }, [setTimerState])
}
