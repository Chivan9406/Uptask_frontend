import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router'

export default function NavMenu() {
  return (
    <Popover className="relative">
      <PopoverButton className="p-1 rounded-lg bg-purple-400 hover:bg-purple-500 cursor-pointer transition-colors">
        <Bars3Icon className="w-8 h-8 text-white" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48 transition duration-200 ease-in-out opacity-100 translate-y-0 data-closed:opacity-0 data-closed:translate-y-1"
      >
        <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          <p className="text-center">Hola: Usuario</p>
          <Link to="/profile" className="block p-2 hover:text-purple-950">
            Mi Perfil
          </Link>
          <Link to="/" className="block p-2 hover:text-purple-950">
            Mis Proyectos
          </Link>
          <button
            className="block p-2 hover:text-purple-950 w-full cursor-pointer text-left"
            type="button"
            onClick={() => {}}
          >
            Cerrar Sesión
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
