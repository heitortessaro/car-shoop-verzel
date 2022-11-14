import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import CardVehicle from '../../components/cardVehicle/CardVehicle';
// import SelectBar from '../../components/selectBar/SelectBar';
// import getVehicles from '../../features/vehicles/getvehicles';
// import { selectVehicles, selectLoading } from '../../features/vehicles/vehiclesSlice';
import { selectLogged } from '../../features/user/userSlice';

export default function ControlForm() {
  const newDate = new Date();
  const navigate = useNavigate();
  const loggedUser = useSelector(selectLogged);
  const {
    register,
    // handleSubmit,
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
  // const vehicleList = useSelector(selectVehicles);
  // const loading = useSelector(selectLoading);
  // const dispatch = useDispatch();

  return (
    <main className="w-screen grow bg-slate-200 text-slate-800 flex justify-center items-center py-4">
      {!loggedUser && (
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-red-500 pb-7">
            Você deve estar logado para acessar os recursos de edição das informações dos vehículos
            a venda
          </p>
          <button onClick={() => navigate('/login')} className="btn btn-primary w-64">
            Página de Login
          </button>
        </div>
      )}
      {loggedUser && (
        <form className="border-2 rounded-lg border-slate-400 flex flex-col  gap-4 w-3/4  max-w-2xl p-4">
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
            <p className="text-xs text-red-500">{errors.password.message}</p>
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
          {errors.model !== undefined && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
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
          {errors.model !== undefined && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}

          <div className="flex gap-4">
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
            {errors.model !== undefined && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}

            <input
              type="text"
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
            {errors.model !== undefined && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <textarea
            {...register('brand', {
              required: 'Forneça uma descrição do veículo',
              minLength: { value: 20, message: 'Deve possuir ao menos 20 caractéres' }
            })}
            className="textarea textarea-bordered input-primary w-full max-w-2xl"
            placeholder="Descrição"
          />

          <input
            type="file"
            {...register('vehicleImage', {
              required: 'Forneça uma imagem do veículo'
            })}
            name="vehicleImage"
            accept="image/png, image/jpeg"
            className="file-input file-input-bordered w-full max-w-2xl"
          />

          <input type="submit" value="Cadastrar" className="btn w-32 mx-auto" />
        </form>
      )}
    </main>
  );
}
