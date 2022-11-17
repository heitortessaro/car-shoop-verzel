import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteVehicle from '../../features/vehicles/actions/deleteVehicle';
import { selectToken } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { selectIdToRemove, hideModal } from '../../features/vehicles/vehiclesSlice';

export default function DeleteConfirmationModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationToken = useSelector(selectToken);
  const vehicleId = useSelector(selectIdToRemove);

  const handleRemoveVehicle = () => {
    dispatch(deleteVehicle({ authorizationToken, vehicleId }));
    navigate('/admin');
  };

  return (
    <div className="fade fixed top-1/3 left-1/3 w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="modal-box border-3 border-r-4 bg-base-content text-white">
        <h3 className="font-bold text-lg">Remover o registro do banco de dados?</h3>
        <p className="py-4">
          Você está removendo esse registro do banco de dados. Se você está ciente dessa operação e
          desaja confirmá-la clique no botão <span className="font-bold">Confirmar Remoção </span>{' '}
          abaixo.
        </p>
        <div className="flex justify-around">
          <button type="button " onClick={() => dispatch(hideModal())} className="btn btn-primary">
            Cancelar Operação
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(hideModal());
              handleRemoveVehicle();
            }}
            className="btn btn-error">
            Confirmar Remoção
          </button>
        </div>
      </div>
    </div>
  );
}
