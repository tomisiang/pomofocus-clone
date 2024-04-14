import { useAppStore } from '@/states'

export default function ProgressBar() {
  const progress = useAppStore(state => state.progress())

  return (
    <div className='absolute bottom-0 h-[1px] w-full'>
      <div className='relative w-full h-full'>
        <div
          className={`absolute bg-white h-[3px] top-[-1px] rounded-md`}
          style={{ width: `${progress}%` }}
        />
        <div
          className={`absolute bg-black opacity-[.1] w-full h-full rounded-md`}
        />
      </div>
    </div>
  )
}
