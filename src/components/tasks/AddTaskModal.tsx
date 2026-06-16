import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router'
import TaskForm from '@/components/tasks/TaskForm'
import { useForm } from 'react-hook-form'
import type { TaskFormData } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'

export default function AddTaskModal() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const show = !!modalTask

  const params = useParams()
  const projectId = params.projectId!

  const initialValues: TaskFormData = {
    name: '',
    description: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      toast.success(data)
      reset()
      navigate('', { replace: true })
    },
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
    }

    mutate(data)
  }

  return (
    <Dialog open={show} className="relative z-10" onClose={() => navigate('', { replace: true })}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 transition duration-300 ease-in-out opacity-100 data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 ease-in-out duration-300 opacity-100 scale-100 data-closed:opacity-0 data-closed:scale-95"
          >
            <DialogTitle as="h3" className="font-black text-4xl mb-5">
              Nueva tarea
            </DialogTitle>

            <p className="text-xl font-bold">
              Llena el formulario y crea {''}
              <span className="text-fuchsia-600">una tarea</span>
            </p>

            <form className="mt-10 space-y-3" onSubmit={handleSubmit(handleCreateTask)} noValidate>
              <TaskForm register={register} errors={errors} />

              <input
                type="submit"
                value="Guardar tarea"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
              />
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
