import React from 'react';
import { useDispatch } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import { sortVehicleList } from '../../features/vehicles/vehiclesSlice';

export default function SelectBar() {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    dispatch(sortVehicleList(e.target.value));
  };

  return (
    <div className="navbar flex justify-end bg-slate-700">
      <select
        onChange={handleSelect}
        className="navbar-end select select-secondary w-full max-w-xs">
        <option disabled selected>
          Ordene por
        </option>
        <option value="anoCrescente">Ano Crescente</option>
        <option value="anoDescrecente">Ano Descrecente</option>
        <option value="valorCrecente">Valor Creacente</option>
        <option value="valorDecrecente">Valor Descrecente</option>
        <option value="modeloAlfabetico">Modelo (alfabético)</option>
      </select>
    </div>
  );
}
