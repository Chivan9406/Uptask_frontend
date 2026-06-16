import { isAxiosError } from 'axios'
import api from '@/lib/axios'
import type { Project, TaskFormData } from '@/types/index.ts'

type TaskAPI = {
  formData: TaskFormData
  projectId: Project['_id']
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {
  try {
    const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error })
    }
  }
}
