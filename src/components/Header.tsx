import ProgressBar from './ProgressBar'
import check from '@/assets/icon-white2.png'

export default function Header() {
  return (
    <header className='w-full h-[60px] '>
      <div className='max-w-[644px] px-3 mx-auto h-full'>
        <div className='h-full flex items-center relative'>
          <div className='flex gap-[4px] items-center'>
            <img src={check} alt='check' className='w-[20px] h-[20px]' />
            <h1 className='text-xl font-bold text-white'>Pomofocus Clone</h1>
          </div>
          <ProgressBar />
        </div>
      </div>
    </header>
  )
}
