import addIcon from '@/assets/plus-circle-white.png'
import { useState } from 'react'
import TaskForm from './TaskForm'

export default function AddTask() {
  const [isAddMode, setIsAddMode] = useState(false)

  const addMode = () => setIsAddMode(true)
  const cancelAddMode = () => setIsAddMode(false)

  if (isAddMode) {
    return (
      <div className='mt-3'>
        <TaskForm mode='add' onCancel={cancelAddMode} />
      </div>
    )
  }

  return (
    <button
      onClick={addMode}
      className='mt-3 flex items-center justify-center gap-2 bg-[rgba(0,0,0,0.1)] h-16 border-dashed border-2 border-[rgba(255,255,255,0.4)] group opacity-80 hover:opacity-100 rounded-lg'
    >
      <img
        src={addIcon}
        alt='add-icon'
        className='opacity-80 w-[18px] h-[18px] group-hover:opacity-100'
      />
      <span className='opacity-80 text-white leading-none group-hover:opacity-100'>
        Add Task
      </span>
    </button>
  )
}
