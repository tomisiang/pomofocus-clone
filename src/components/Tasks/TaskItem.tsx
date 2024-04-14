import { useAppStore, useTasksStore } from '@/states'
import { useState } from 'react'
import TaskForm from './TaskForm'
import clsx from 'clsx'
import edit from '@/assets/vertical-ellipsis.png'
import type { Task } from '@/types/tasks'

/**
 * Serves as Display only Card and Form
 */
export default function TaskItem(props: Task) {
  const { id, title, notes, completed, total, isCompleted } = props
  const { selectedTask, setSelectedTask } = useAppStore()
  const { updateTask } = useTasksStore()
  const isSelectedTask = selectedTask === id

  const [isEditMode, setIsEditMode] = useState(false)
  const editMode = () => setIsEditMode(true)
  const cancelEditMode = () => setIsEditMode(false)

  const toggleIsCompleted = () => {
    updateTask({ ...props, isCompleted: !isCompleted })
  }

  if (isEditMode) {
    return <TaskForm onCancel={cancelEditMode} mode='edit' task={props} />
  }

  return (
    <div
      className={clsx('bg-white rounded border-l-[6px] cursor-pointer', {
        'border-[rgb(34,34,34)] translate-y-[2px]': isSelectedTask,
        'border-transparent hover:border-[rgb(204,204,204)]': !isSelectedTask,
      })}
      onClick={() => setSelectedTask(id)}
    >
      <div className='flex items-center justify-between px-[18px]'>
        <div className='flex items-center gap-2.5 py-[18px]'>
          <div
            className={clsx(
              'w-[22px] h-[22px] border-2 rounded-full box-content hover:opacity-[.6]',
              {
                'bg-pomodoro-red border-pomodoro-red': isCompleted,
                'bg-pomodoro-gray border-pomodoro-gray': !isCompleted,
              }
            )}
            onClick={toggleIsCompleted}
          >
            <div className='ml-[7px] mt-[3px] w-[5px] h-[11px] border-t-0 border-r-[3px] border-b-[3px] border-l-0 border-white rotate-45' />
          </div>
          <h1
            className={clsx('text-base font-bold text-[rgb(85,85,85)]', {
              'line-through text-[rgb(170,170,170)]': isCompleted,
            })}
          >
            {title}
          </h1>
        </div>
        <div className='flex gap-[18px]'>
          <div className='text-sm text-[rgb(170,170,170)]'>
            <span className='text-lg font-bold'>{completed}</span> /{' '}
            <span>{total}</span>
          </div>
          <button
            onClick={editMode}
            className='border-[1px] border-pomodoro-gray p-1 rounded hover:bg-pomodoro-gray'
          >
            <img src={edit} alt='edit' className='w-[18px] opacity-[.4]' />
          </button>
        </div>
      </div>
      {!!notes && (
        <div className='pr-[18px] pb-3 pl-[30px]'>
          <textarea
            value={notes}
            disabled
            className='w-full text-[rgb(96,85,21)] bg-[rgb(252,248,222)] py-2.5 px-3 resize-none rounded'
          />
        </div>
      )}
    </div>
  )
}
