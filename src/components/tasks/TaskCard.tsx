import type { Task } from '@/types/index'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

type TaskCardProps = {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      <div className="min-w-0 flex flex-col gap-y-4">
        <button type="button" className="text-xl font-bold text-slate-600 text-left">
          {task.name}
        </button>
        <p className="text-slate-500">{task.description}</p>
      </div>
      <div className="flex shrink-0 gap-x-6">
        <Menu as="div" className="relative">
          <MenuButton className="-m-2.5 block text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition duration-100 ease-in-out transform opacity-100 scale-100 data-closed:opacity-0 data-closed:scale-95"
          >
            <MenuItem>
              <button
                type="button"
                className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-gray-950 transition-colors cursor-pointer"
              >
                Ver tarea
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-gray-950 transition-colors cursor-pointer"
              >
                Editar tarea
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-600 transition-colors w-full cursor-pointer text-left"
              >
                Eliminar tarea
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </li>
  )
}
