import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLogged, selectToken } from '../../features/user/userSlice';
import { selectRequestSucess, selectRequestEnd } from '../../features/vehicles/vehiclesSlice';
import saveVehicle from '../../features/vehicles/actions/saveVehicle';
import { useState } from 'react';
import AdminBar from '../../components/adminBar/AdminBar';

export default function ControlForm() {
  const newDate = new Date();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authorizationToken = useSelector(selectToken);
  const loggedUser = useSelector(selectLogged);
  const requestSucess = useSelector(selectRequestSucess);
  const requestEnd = useSelector(selectRequestEnd);

  const [requestError, setRequestError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      model: '',
      brand: '',
      description: '',
      year: 2000,
      color: '',
      buyValue: 0
    }
  });

  const submitFormData = (data) => {
    setRequestError(false);
    const formData = new FormData();
    formData.append('brand', data.brand);
    formData.append('buyValue', parseInt(data.buyValue));
    formData.append('color', data.color);
    formData.append('description', data.description);
    formData.append('model', data.model);
    formData.append('vehicleImage', data.vehicleImage[0]);
    formData.append('year', parseInt(data.year));
    dispatch(saveVehicle({ authorizationToken, formData }));
  };

  const handleRequestEnd = () => {
    if (requestEnd) {
      if (requestSucess) {
        setRequestError(false);
        reset();
      } else {
        setRequestError(false);
      }
    }
  };

  useEffect(() => {
    handleRequestEnd();
  }, [requestEnd]);

  return (
    <main className="w-screen grow bg-slate-200 text-slate-800 flex flex-col justify-center">
      {loggedUser && <AdminBar />}
      <div className="grow flex flex-col justify-center items-center">
        {requestError && (
          <p className="text-red-500 ">Erro ao realizar a operação com o servidor</p>
        )}
        {!loggedUser && (
          <div className="flex flex-col items-center ">
            <p className="text-lg font-bold text-red-500 pb-7">
              Você deve estar logado para acessar os recursos de edição das informações dos
              vehículos a venda
            </p>
            <button onClick={() => navigate('/login')} className="btn btn-primary w-64">
              Página de Login
            </button>
          </div>
        )}
        {loggedUser && (
          <form
            onSubmit={handleSubmit((data) => {
              submitFormData(data);
            })}
            className="border-2 rounded-lg border-slate-400 flex flex-col  gap-4 w-3/4  max-w-2xl p-4">
            <input
              type="text"
              {...register('model', {
                required: 'Forneça o modelo do veículo',
                minLength: { value: 2, message: 'Deve possuir ao menos 2 caractéres' }
              })}
              placeholder="Modelo"
              className="input input-bordered input-primary w-full max-w-2xl"
            />
            {errors.model !== undefined && (
              <p className="text-xs text-red-500">{errors.model.message}</p>
            )}

            <input
              type="text"
              {...register('brand', {
                required: 'Forneça a montadora do veículo',
                minLength: { value: 2, message: 'Deve possuir ao menos 2 caractéres' }
              })}
              placeholder="Montadora"
              className="input input-bordered input-primary w-full max-w-2xl"
            />
            {errors.brand !== undefined && (
              <p className="text-xs text-red-500">{errors.brand.message}</p>
            )}

            <input
              type="text"
              {...register('color', {
                required: 'Forneça a cor do veículo',
                minLength: { value: 3, message: 'Deve possuir ao menos 3 caractéres' }
              })}
              placeholder="Cor"
              className="input input-bordered input-primary w-full max-w-2xl"
            />
            {errors.color !== undefined && (
              <p className="text-xs text-red-500">{errors.color.message}</p>
            )}

            <div className="flex gap-4">
              <div>
                <input
                  type="number"
                  {...register('year', {
                    required: 'Forneça o ano do veículo',
                    min: {
                      value: 2000,
                      message: 'Não são aceitos veículos mais antigos que o ano 2000'
                    },
                    max: {
                      value: newDate.getFullYear(),
                      message: `Não são aceitos veículos mais antigos que o ano 2000 ${newDate.getFullYear()}`
                    }
                  })}
                  placeholder="Ano do veículo"
                  className="input input-bordered input-primary w-full max-w-2xl"
                />
                {errors.year !== undefined && (
                  <p className="text-xs text-red-500">{errors.year.message}</p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  {...register('buyValue', {
                    required: 'Forneça o valor de venda do veículo',
                    min: {
                      value: 0,
                      message: 'Não são aceitos valores negativos'
                    }
                  })}
                  placeholder="Valor sem pontos ou espaços"
                  className="input input-bordered input-primary w-full max-w-2xl"
                />
                {errors.buyValue !== undefined && (
                  <p className="text-xs text-red-500">{errors.buyValue.message}</p>
                )}
              </div>
            </div>

            <textarea
              {...register('description', {
                required: 'Forneça uma descrição do veículo',
                minLength: { value: 20, message: 'Deve possuir ao menos 20 caractéres' }
              })}
              className="textarea textarea-bordered input-primary w-full max-w-2xl"
              placeholder="Descrição"
            />
            {errors.description !== undefined && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}

            <input
              type="file"
              {...register('vehicleImage', {
                required: 'Forneça uma imagem do veículo'
              })}
              name="vehicleImage"
              accept="image/png, image/jpeg"
              className="file-input file-input-bordered w-full max-w-2xl"
            />
            {errors.vehicleImage !== undefined && (
              <p className="text-xs text-red-500">{errors.vehicleImage.message}</p>
            )}

            <input type="submit" value="Cadastrar" className="btn w-32 mx-auto" />
          </form>
        )}
      </div>
    </main>
  );
}
