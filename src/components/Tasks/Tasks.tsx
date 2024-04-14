import { useAppStore, useTasksStore } from '@/states'
import TaskItem from './TaskItem'
import AddTask from './AddTask'

export default function Tasks() {
  const { tasks } = useTasksStore()
  const { selectedTask, longBreakInterval } = useAppStore()

  const selectedTaskTitle =
    tasks.find(task => task.id === selectedTask)?.title ?? 'Time to focus!'

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center gap-1 text-white'>
        <span className='text-base opacity-60'>#{longBreakInterval}</span>
        <span className='text-lg'>{selectedTaskTitle}</span>
      </div>
      <div className='flex justify-between items-center pb-3.5 border-b-2 border-[rgba(255,255,255,0.6)]'>
        <h2 className='text-lg text-white font-bold'>Tasks</h2>
      </div>
      {!!tasks.length && (
        <div className='flex flex-col gap-2 mt-[18px]'>
          {tasks.map(task => (
            <TaskItem key={task.id} {...task} />
          ))}
        </div>
      )}
      <AddTask />
    </div>
  )
}
