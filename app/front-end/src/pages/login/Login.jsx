import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogged } from '../../features/user/userSlice';

import loginUser from '../../features/user/actions/loginUser';

export default function Login() {
  const loggedUser = useSelector(selectLogged);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUserLogin = () => {
    if (loggedUser) {
      navigate('/admin');
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, [loggedUser]);

  return (
    <main className="w-screen grow bg-slate-200 text-slate-800 flex justify-center items-center py-4">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(loginUser(data));
        })}
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
        {errors.email !== undefined && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register('password', {
            required: 'Forneça uma senha válida',
            minLength: { value: 6, message: 'Deve possuir ao menos 6 caractéres' }
          })}
          placeholder="Password"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        {errors.password !== undefined && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}

        <input type="submit" value="Login" className="btn w-24 mx-auto" />
      </form>
    </main>
  );
}
