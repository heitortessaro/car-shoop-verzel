import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectLogged } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { showModal, setIdToRemove } from '../../features/vehicles/vehiclesSlice';

export default function CardVehicle({ vehicleInfo }) {
  const { model, brand, description, year, buyValue, image, _id: id } = vehicleInfo;
  const imageURL = `${import.meta.env.VITE_API_BASE_URL}${image}`;
  const logged = useSelector(selectLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="card w-96 bg-base-100 text-zinc-700 shadow-xl">
      <figure className="px-4 pt-4">
        <img src={imageURL} alt={`Image from ${model} in sale`} className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {model}
          <div className="badge badge-secondary">{` Valor: R$ ${buyValue}`}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{brand}</div>
          <div className="badge badge-outline">{year}</div>
        </div>
        {logged && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => navigate('/admin')}>
              Editar
            </button>
            <button
              className="btn btn-warning"
              type="buttom"
              onClick={() => {
                dispatch(setIdToRemove(id));
                dispatch(showModal(true));
              }}>
              Remove Registro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

CardVehicle.propTypes = {
  vehicleInfo: PropTypes.shape({
    model: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    buyValue: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  })
};
