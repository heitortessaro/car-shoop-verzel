import React from 'react';
import PropTypes from 'prop-types';

export default function CardVehicle({ model, brand, description, year, buyValue, image }) {
  return (
    <div className="card w-96 bg-base-100 text-zinc-700 shadow-xl">
      <figure className="px-4 pt-4">
        <img src={image} alt="Shoes" className="rounded-xl" />
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
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Editar</button>
        </div>
      </div>
    </div>
  );
}

CardVehicle.propTypes = {
  model: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  buyValue: PropTypes.number.isRequired
};
