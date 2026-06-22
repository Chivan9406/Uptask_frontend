import { getTaskById } from '@/api/TaskAPI'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation, useParams } from 'react-router'
import EditTaskModal from './EditTaskModal'

export default function EditTaskData() {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('editTask')!

  const { data, isError } = useQuery({
    queryFn: () => getTaskById({ projectId, taskId }),
    queryKey: ['task', taskId],
    enabled: !!taskId,
    retry: false,
  })

  if (isError) return <Navigate to={'/404'} />

  if (data) return <EditTaskModal data={data} taskId={taskId} />
}
