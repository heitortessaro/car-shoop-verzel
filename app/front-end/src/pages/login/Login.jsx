import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  console.log(errors);

  return (
    <main className="w-screen grow bg-slate-200 text-slate-800 flex justify-center items-center py-4">
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="border-2 rounded-lg border-slate-400 flex flex-col  gap-4 w-80 p-4">
        <input
          type="text"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'E-mail inválido'
            },
            required: true
          })}
          placeholder="E-mail"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        {errors.email !== undefined && <p>{errors.email.message}</p>}

        <input
          type="password"
          {...register('password', {
            required: 'Forneça uma senha válida',
            minLength: { value: 6, message: 'Deve possuir ao menos 6 caractéres' }
          })}
          placeholder="Password"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        {errors.password !== undefined && <p>{errors.password.message}</p>}

        <input type="submit" value="Login" className="btn w-24 mx-auto" />
      </form>
    </main>
  );
}
