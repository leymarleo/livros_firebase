import Car from '../components/Car.jsx';
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';
import { db } from '../firebase/config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { selectUsers } from '../store/usersSlice.js';

function CarsPage() {
  const uid = useSelector(selectUsers).currentUser.id;
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const q = query(collection(db, "carros"), where("user_id", "==", uid));
      const querySnapshot = await getDocs(q);
      let carList = [];
      querySnapshot.forEach((doc) => {
        carList.push({ id: doc.id, ...doc.data() });
      });
      setCars(carList);
    };

    fetchCars();
  }, [uid]);

  const pageTitle = "🚗 Lista de Carros";

  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />
        <div className="cars-container">
          <div className="cars-list">
            {cars.map(car => <Car key={car.id} car={car} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default CarsPage;
