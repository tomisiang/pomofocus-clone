import clsx from 'clsx'
import { AppClock, Header, Tasks } from './components'
import { useAppClock } from './features/useAppClock'
import { useAppStore } from './states'

export default function App() {
  const { mode } = useAppStore()
  useAppClock()

  return (
    <div
      className={clsx(
        'min-h-screen transition-[background-color] ease-in-out duration-500',
        {
          'bg-pomodoro-red': mode === 'pomodoro',
          'bg-pomodoro-green': mode === 'shortBreak',
          'bg-pomodoro-blue': mode === 'longBreak',
        }
      )}
    >
      <Header />
      <main className='pt-[40px]'>
        <div className='max-w-[480px] mx-auto px-3 sm:px-0 flex flex-col gap-5'>
          <AppClock />
          <Tasks />
        </div>
      </main>
    </div>
  )
}
