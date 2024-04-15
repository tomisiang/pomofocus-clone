import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useTasksStore } from '@/states'
import caretUp from '@/assets/caret-up.png'
import caretDown from '@/assets/caret-down.png'
import type { Task } from '@/types/tasks'
import type { RegisterComponent } from '@/types/reactHookForm'

interface Inputs {
  title: string
  notes?: string
  completed: number
  total: number
}

type TaskFormProps = { onCancel: () => void } & (
  | { mode: 'edit'; task: Task }
  | { mode: 'add' }
)

export default function TaskForm(props: TaskFormProps) {
  const { mode, onCancel } = props

  const task = useMemo(() => {
    if (props.mode === 'add') return null

    return props.task
  }, [props])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      completed: 0,
      total: 0,
    },
  })

  const registerComponent: RegisterComponent<Inputs> = {
    title: register('title', {
      required: { value: true, message: 'Title is required' },
    }),
    notes: register('notes'),
    completed: register('completed', {
      validate: value =>
        value < 0 ? "Act can't be a negative number" : undefined,
    }),
    total: register('total', {
      validate: value =>
        value < 0 ? "Est can't be a negative number" : undefined,
    }),
  }

  useEffect(() => {
    Object.values(errors).forEach(error => {
      if (error.message) {
        toast.error(error.message)
      }
    })
  }, [errors])

  const [isOpenNotesEditor, setIsOpenNotesEditor] = useState(false)
  const openNotesEditor = () => setIsOpenNotesEditor(true)

  const isInit = useRef(false)
  useEffect(() => {
    if (task && !isInit.current) {
      isInit.current = true

      const { title, notes } = task
      setValue('title', title)
      setValue('notes', notes)
      setValue('completed', task.completed)
      setValue('total', task.total)
      if (notes) openNotesEditor()
    }
  }, [task, setValue])

  const { addTask, updateTask, deleteTask } = useTasksStore()

  const onSubmit = handleSubmit(data => {
    // Add
    if (mode === 'add') {
      addTask({ isCompleted: false, ...data })
    }
    // Update
    else if (task) {
      updateTask({ ...task, ...data })
    }

    onCancel()
  })

  const onDelete = () => {
    if (task) {
      deleteTask(task)
      onCancel()
    }
  }

  const incrementEstimates = () => setValue('total', Number(watch('total')) + 1)
  const decrementEstimates = () => setValue('total', Number(watch('total')) - 1)

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col bg-white rounded overflow-hidden'>
        <div className='flex flex-col pt-9 pb-[18px] px-5 gap-[18px]'>
          <div>
            <input
              type='text'
              {...registerComponent.title}
              placeholder='What are you working on?'
              className='text-xl outline-none text-[rgb(85,85,85)] font-bold'
            />
          </div>
          <div className='flex flex-col gap-2.5 font-bold text-[rgb(85,85,85)]'>
            <div>
              {mode === 'edit' && <span>Act / </span>}
              <span>Est Pomodoros</span>
            </div>
            <div className='flex items-center gap-1.5'>
              {mode === 'edit' && (
                <>
                  <input
                    type='number'
                    className='rounded-md bg-[rgb(239,239,239)] p-2.5 max-w-[75px] text-[rgb(187,187,187)]'
                    {...registerComponent.completed}
                  />
                  <span>/</span>
                </>
              )}
              <input
                type='number'
                className='rounded-md bg-[rgb(239,239,239)] p-2.5 max-w-[75px] text-[rgb(85,85,85)] [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
                {...registerComponent.total}
              />
              <div className='flex gap-1 ml-2.5'>
                <button
                  onClick={incrementEstimates}
                  type='button'
                  className='w-[40px] h-[34px] py-2 px-3 flex justify-center items-center opacity-90 hover:opacity-100 border-pomodoro-gray border-[1px] shadow-est-button rounded active:shadow-none active:translate-y-[2px]'
                >
                  <img
                    src={caretUp}
                    alt='caret-up'
                    className='w-[10px] opacity-60'
                  />
                </button>
                <button
                  onClick={decrementEstimates}
                  type='button'
                  className='w-[40px] h-[34px] py-2 px-3 flex justify-center items-center opacity-90 hover:opacity-100 border-pomodoro-gray border-[1px] shadow-est-button rounded active:shadow-none active:translate-y-[2px]'
                >
                  <img
                    src={caretDown}
                    alt='caret-down'
                    className='w-[10px] opacity-60'
                  />
                </button>
              </div>
            </div>
          </div>
          {!isOpenNotesEditor ? (
            <div className='flex'>
              <button
                type='button'
                onClick={openNotesEditor}
                className='text-[rgba(0,0,0,0.4)] text-sm underline font-bold'
              >
                + Add Note
              </button>
            </div>
          ) : (
            <div>
              <textarea
                {...registerComponent.notes}
                className='outline-none w-full py-2.5 px-3 text-[rgb(85,85,85)] bg-[rgb(239,239,239)] rounded'
              />
            </div>
          )}
        </div>
        <div className='flex items-center justify-between py-3.5 px-5 bg-[rgb(239,239,239)]'>
          {mode === 'edit' && (
            <button
              type='button'
              onClick={onDelete}
              className='text-sm font-bold text-[rgb(136,136,136)] py-2 px-3'
            >
              Delete
            </button>
          )}
          <div className='flex flex-1 gap-2 justify-end '>
            <button
              type='button'
              onClick={onCancel}
              className='text-sm font-bold text-[rgb(136,136,136)] py-2 px-3'
            >
              Cancel
            </button>
            <button className='text-sm py-2 px-3 bg-[rgb(34,34,34)] text-white rounded min-w-[70px] opacity-90 hover:opacity-100'>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
