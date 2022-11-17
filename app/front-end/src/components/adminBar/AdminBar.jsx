import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, selectAdminOperation, defineAdminOperation } from '../../features/user/userSlice';
import { resetInfoToUpdate } from '../../features/vehicles/vehiclesSlice';

export default function AdminBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminOperation = useSelector(selectAdminOperation);

  const handleSelect = (e) => {
    if (adminOperation == 'update' && e.target.value == 'create') {
      dispatch(resetInfoToUpdate());
      dispatch(defineAdminOperation(e.target.value));
      navigate('/admin');
    }
    if (adminOperation == 'create' && e.target.value == 'update') {
      dispatch(resetInfoToUpdate());
      dispatch(defineAdminOperation(e.target.value));
      navigate('/');
    }
  };

  return (
    <div className="navbar flex justify-between  bg-slate-700">
      <input
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
        type="buttom"
        value="Log out"
        className="btn btn-primary w-32"
      />
      <select onChange={handleSelect} className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Selecione ação
        </option>
        <option value="create">Adicionar veículo</option>
        <option value="update">Atualizar veículo</option>
      </select>
    </div>
  );
}
