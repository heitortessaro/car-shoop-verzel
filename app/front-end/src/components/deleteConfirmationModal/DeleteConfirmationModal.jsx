import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import deleteVehicle from '../../features/vehicles/actions/deleteVehicle';
import getvehicles from '../../features/vehicles/actions/getvehicles';
import { selectToken } from '../../features/user/userSlice';
import { selectRequestSucess, selectRequestEnd } from '../../features/vehicles/vehiclesSlice';

export default function DeleteConfirmationModal({ vehicleId }) {
  const dispatch = useDispatch();
  const authorizationToken = useSelector(selectToken);
  const requestSucess = useSelector(selectRequestSucess);
  const requestEnd = useSelector(selectRequestEnd);

  const handleRemoveVehicle = () => {
    dispatch(deleteVehicle({ authorizationToken, vehicleId }));
  };

  const handleRequestEnd = () => {
    if (requestEnd) {
      if (requestSucess) {
        useDispatch(getvehicles());
      }
    }
  };

  useEffect(() => {
    handleRequestEnd();
  }, [requestEnd]);

  return (
    <div>
      <a href="#my-modal-2" className="btn btn-warning">
        Remove Registro
      </a>

      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">
            Você está removendo esse registro do banco de dados. Se você está ciente dessa operação
            e desaja confirmá-la clique no botão{' '}
            <span className="font-bold">Confirmar Remoção</span> abaixo.
          </p>
          <div className="modal-action">
            <a href="#" className="btn">
              Cancelar Operação
            </a>
            <a href="#" onClick={() => handleRemoveVehicle()} className="btn btn-error">
              Confirmar Remoção
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  vehicleId: PropTypes.string.isRequired
};
