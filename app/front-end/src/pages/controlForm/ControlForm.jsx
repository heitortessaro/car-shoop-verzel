import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLogged, selectToken, selectAdminOperation } from '../../features/user/userSlice';
import {
  selectRequestSucess,
  selectRequestEnd,
  selectInfoToUpdate,
  resetRequestInfo
} from '../../features/vehicles/vehiclesSlice';
import saveVehicle from '../../features/vehicles/actions/saveVehicle';
import updateVehicle from '../../features/vehicles/actions/updateVehicle';
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
  const infoToUpdate = useSelector(selectInfoToUpdate);
  const adminOperation = useSelector(selectAdminOperation);

  const [requestError, setRequestError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({});

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
    if (adminOperation === 'update') {
      dispatch(updateVehicle({ authorizationToken, formData, vehicleId: infoToUpdate._id }));
    } else {
      dispatch(saveVehicle({ authorizationToken, formData }));
    }
  };

  const handleRequestEnd = () => {
    console.log(`requestSucess ${requestSucess}`);
    console.log(`requestEnd ${requestEnd}`);
    if (requestSucess && requestEnd) {
      console.log('entrou');
      reset();
      resetRequestInfo(false);
    }
    if (!requestSucess && requestEnd) {
      resetRequestInfo(false);
    }
  };

  const handleFormPopulate = () => {
    if (adminOperation === 'update' && Object.keys(infoToUpdate)) {
      for (const [key, value] of Object.entries(infoToUpdate)) {
        setValue(`${key}`, `${value}`);
      }
    }
  };

  // when select chenges to create reset form
  useEffect(() => {
    if (adminOperation === 'create') {
      reset();
    }
  }, [adminOperation]);

  useEffect(() => {
    handleRequestEnd();
  }, [requestEnd]);

  useEffect(() => {
    handleFormPopulate();
  }, []);

  return (
    <main className="w-screen grow bg-slate-200 text-slate-800 flex flex-col justify-center">
      {loggedUser && <AdminBar />}
      <div className="grow flex flex-col justify-center items-center">
        {adminOperation === 'create' ? (
          <h2 className="text-xl text font-semibold">Adicionar Ve??culo</h2>
        ) : (
          <h2 className="text-xl text font-semibold">Atualizar Ve??culo</h2>
        )}
        {requestError && (
          <p className="text-red-500 ">Erro ao realizar a opera????o com o servidor</p>
        )}
        {!loggedUser && (
          <div className="flex flex-col items-center ">
            <p className="text-lg font-bold text-red-500 pb-7">
              Voc?? deve estar logado para acessar os recursos de edi????o das informa????es dos
              veh??culos a venda
            </p>
            <button onClick={() => navigate('/login')} className="btn btn-primary w-64">
              P??gina de Login
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
                required: 'Forne??a o modelo do ve??culo',
                minLength: { value: 2, message: 'Deve possuir ao menos 2 caract??res' }
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
                required: 'Forne??a a montadora do ve??culo',
                minLength: { value: 2, message: 'Deve possuir ao menos 2 caract??res' }
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
                required: 'Forne??a a cor do ve??culo',
                minLength: { value: 3, message: 'Deve possuir ao menos 3 caract??res' }
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
                    required: 'Forne??a o ano do ve??culo',
                    min: {
                      value: 2000,
                      message: 'N??o s??o aceitos ve??culos mais antigos que o ano 2000'
                    },
                    max: {
                      value: newDate.getFullYear(),
                      message: `N??o s??o aceitos ve??culos mais antigos que o ano 2000 ${newDate.getFullYear()}`
                    }
                  })}
                  placeholder="Ano do ve??culo"
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
                    required: 'Forne??a o valor de venda do ve??culo',
                    min: {
                      value: 0,
                      message: 'N??o s??o aceitos valores negativos'
                    }
                  })}
                  placeholder="Valor do veh??culo sem v??rgula"
                  className="input input-bordered input-primary w-full max-w-2xl"
                />
                {errors.buyValue !== undefined && (
                  <p className="text-xs text-red-500">{errors.buyValue.message}</p>
                )}
              </div>
            </div>

            <textarea
              {...register('description', {
                required: 'Forne??a uma descri????o do ve??culo',
                minLength: { value: 20, message: 'Deve possuir ao menos 20 caract??res' }
              })}
              className="textarea textarea-bordered input-primary w-full max-w-2xl"
              placeholder="Descri????o"
            />
            {errors.description !== undefined && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}

            <input
              type="file"
              {...register('vehicleImage', {
                required: 'Forne??a uma imagem do ve??culo'
              })}
              name="vehicleImage"
              accept="image/png, image/jpeg"
              className="file-input file-input-bordered w-full max-w-2xl"
            />
            {errors.vehicleImage !== undefined && (
              <p className="text-xs text-red-500">{errors.vehicleImage.message}</p>
            )}

            <div className="flex">
              <button type="submit" className="btn w-32 mx-auto">
                {adminOperation === 'create' ? 'Cadastrar' : 'Atualizar Registro'}
              </button>
              {adminOperation === 'create' && (
                <button
                  type="button"
                  onClick={() => reset()}
                  className="btn btn-warning w-32 mx-auto">
                  Limpar Formul??rio
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
