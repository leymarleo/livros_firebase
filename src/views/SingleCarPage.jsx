import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';

function SingleCarPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);

  const handleEraseCar = async (id) => {
    if (confirm('Você tem certeza que deseja apagar este carro?')) {
      try {
        await deleteDoc(doc(db, "carros", id));
        navigate("/cars");
      } catch (error) {
        console.error("Erro ao apagar o carro:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCar = async (carId) => {
      try {
        const docRef = doc(db, "carros", carId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCar({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Erro ao buscar o carro:", error);
      }
    };

    fetchCar(id);
  }, [id]);

  const handleToggleSeen = async (car) => {
    const carRef = doc(db, "carros", car.id);
    try {
      await updateDoc(carRef, { seen: !car.seen });
      setCar({ ...car, seen: !car.seen });
    } catch (error) {
      console.error("Erro ao atualizar o carro:", error);
    }
  };

  return (
    <div className="container">
      <Link to="/cars">
        <button className="btn">
          ← Voltar para Carros (Back to Cars)
        </button>
      </Link>

      {car ? (
        <div>
          <div className="single-car">
            <div className="car-cover">
              <img src={car.photo} alt={car.model} />
            </div>

            <div className="car-details">
              <h3 className="car-model">{car.model}</h3>
              <p className="car-brand">{car.brand}</p>
              <p className="car-year">{car.year}</p>
              <p className="car-story">{car.story}</p> {/* Exibir a história */}
              <div className="seen-checkbox">
                <input
                  type="checkbox"
                  checked={car.seen}
                  onChange={() => handleToggleSeen(car)}
                />
                <label>{car.seen ? "Visto" : "Não visto"}</label>
              </div>
              <div onClick={() => handleEraseCar(car.id)} className="erase-car">
                Apagar carro (Erase Car)
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Carro não encontrado. Clique no botão acima para voltar para a lista de carros.</p>
        </div>
      )}
    </div>
  );
}

export default SingleCarPage;
