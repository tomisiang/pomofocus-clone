import { useAppStore, useSettingsStore } from '@/states'
import { AppStore } from '@/types/app'
import clsx from 'clsx'

export default function AppClock() {
  const { mode, countDown, toggleTimerState, timerState } = useAppStore()
  const [minutes, seconds] = countDown()

  return (
    <div className='flex flex-col gap-5 items-center bg-[rgba(255,255,255,0.1)] pt-5 pb-7 rounded-md text-white '>
      <div className='flex'>
        <ModeButton mode={'pomodoro'} isActive={mode === 'pomodoro'} />
        <ModeButton mode={'shortBreak'} isActive={mode === 'shortBreak'} />
        <ModeButton mode={'longBreak'} isActive={mode === 'longBreak'} />
      </div>
      <div className='flex gap-1 text-[100px] sm:text-[120px] font-bold leading-tight'>
        <span>
          {minutes < 10 ? '0' : ''}
          {minutes}
        </span>
        :
        <span>
          {seconds < 10 ? '0' : ''}
          {seconds}
        </span>
      </div>
      <button
        onClick={toggleTimerState}
        className={clsx(
          'w-[200px] h-[55px] bg-white rounded font-bold text-xl',
          {
            'text-pomodoro-red': mode === 'pomodoro',
            'text-pomodoro-blue': mode === 'shortBreak',
            'text-pomodoro-green': mode === 'longBreak',
          },
          {
            'translate-y-[6px]': timerState === 'start',
            'shadow-3d': timerState !== 'start',
          }
        )}
      >
        {timerState === 'start' ? 'PAUSE' : 'START'}
      </button>
    </div>
  )
}

function ModeButton({
  mode,
  isActive,
}: {
  mode: AppStore['mode']
  isActive: boolean
}) {
  const { names } = useSettingsStore()
  const { setMode } = useAppStore()

  return (
    <button
      className={`px-3 py-0.5 rounded ${
        isActive ? 'bg-[rgba(0,0,0,0.15)] font-bold' : ''
      }`}
      onClick={() => setMode(mode, 'pause')}
    >
      {names[mode]}
    </button>
  )
}
