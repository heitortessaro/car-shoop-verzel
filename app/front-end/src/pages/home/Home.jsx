import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardVehicle from '../../components/cardVehicle/CardVehicle';
import getVehicles from '../../features/vehicles/getvehicles';
import { selectVehicles, selectLoading } from '../../features/vehicles/vehiclesSlice';

export default function Home() {
  const vehicleList = useSelector(selectVehicles);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  return (
    <main className="w-screen grow bg-slate-200 text-slate-800 flex flex-wrap	gap-4 justify-center py-4">
      {loading && (
        <div className="fixed bottom-24 right-0 h-full w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {!loading && vehicleList.map((e, i) => <CardVehicle key={i} vehicleInfo={vehicleList[i]} />)}
    </main>
  );
}
