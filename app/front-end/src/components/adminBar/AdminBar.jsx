import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { defineAdminOperation, logout } from '../../features/user/userSlice';

export default function AdminBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    dispatch(defineAdminOperation(e.target.value));
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
        className="btn btn-outline w-32"
      />
      <select onChange={handleSelect} className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Selecione a operação a ser realizada
        </option>
        <option value="create">Adicionar veículo</option>
        <option value="research">Buscar veículo</option>
        <option value="delete">Remover veículo</option>
        <option value="update">Atualizar veículo</option>
      </select>
    </div>
  );
}
