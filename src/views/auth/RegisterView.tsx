import { useForm } from 'react-hook-form'
import type { UserRegisterForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { createAccount } from '@/api/AuthAPI'
import { toast } from 'react-toastify'

export default function RegisterView() {
  const initialValues: UserRegisterForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegisterForm>({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
      reset()
    },
  })

  const password = watch('password')

  const handleRegister = (formData: UserRegisterForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3  border-gray-300 border"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email no válido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="name"
            placeholder="Nombre"
            className="w-full p-3  border-gray-300 border"
            {...register('name', {
              required: 'El nombre es obligatorio',
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="password">
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repetir contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite la contraseña"
            className="w-full p-3  border-gray-300 border"
            {...register('password_confirmation', {
              required: 'Repetir la contraseña es obligatorio',
              validate: value => value === password || 'Las contraseñas no son iguales',
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/login" className="text-center text-gray-300 font-normal">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  )
}
