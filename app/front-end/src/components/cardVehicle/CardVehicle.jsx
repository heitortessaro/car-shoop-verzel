import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectLogged } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function CardVehicle({ vehicleInfo }) {
  const { model, brand, description, year, buyValue, image } = vehicleInfo;
  const imageURL = `${import.meta.env.VITE_API_BASE_URL}${image}`;
  const logged = useSelector(selectLogged);
  const navigate = useNavigate();

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
          <div className="card-actions justify-end" onClick={() => navigate('/admin')}>
            <button className="btn btn-primary">Editar</button>
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
    buyValue: PropTypes.number.isRequired
  })
};
