import { Link } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProject, getProjects } from '@/api/ProjectAPI.ts'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success(data)
    },
  })

  if (isLoading) return 'Cargando...'

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

        <nav className="my-5">
          <Link
            to="/projects/create"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors uppercase"
          >
            Nuevo proyecto
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map(project => (
              <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400 my-2">Cliente: {project.clientName}</p>
                    <p className="text-sm text-gray-400 my-2">{project.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition duration-100 ease-in-out transform opacity-100 scale-100 data-closed:opacity-0 data-closed:scale-95"
                    >
                      <MenuItem>
                        <Link
                          to={`/projects/${project._id}`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-gray-950 transition-colors"
                        >
                          Ver proyecto
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={`/projects/${project._id}/edit`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-gray-950 transition ease-in duration-75"
                        >
                          Editar proyecto
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-600 transition-colors w-full cursor-pointer text-left"
                          onClick={() => {
                            mutate(project._id)
                          }}
                        >
                          Eliminar proyecto
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            Aún no hay proyectos. {''}
            <Link
              to="/projects/create"
              className="text-purple-400 hover:text-purple-500 hover:underline text-lg font-bold cursor-pointer transition-colors uppercase"
            >
              Crea uno nuevo
            </Link>
          </p>
        )}
      </>
    )
}
