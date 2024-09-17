import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSeen } from '../store/carsSlice'; // Supondo que você tenha uma ação toggleSeen no carsSlice

function Car({ car }) {
  const dispatch = useDispatch();

  function handleToggleSeen(e, id) {
    e.preventDefault();
    dispatch(toggleSeen(id));
  }

  return (
    <>  
      <Link to={'/car/' + car.id}>
        <div className="car">
          {
            car.seen && 
            <div className="seenIt">
              <i className="fa-solid fa-eye"></i>
            </div>
          }
          
          <div className="car-cover">
            <img src={car.photo} alt={car.model} />
            <button onClick={(e) => { handleToggleSeen(e, car.id) }} className={car.seen ? 'isSeen' : ''}>
              <i className="fa-solid fa-eye"></i>
              <span>{ car.seen ? "Visto" : "Não visto" }</span>
            </button>
          </div>

          <div className="car-details">
            <p className="car-brand">{ car.brand }</p>
            <h3 className="car-model">{ car.model }</h3>
            <p className="car-year">{ car.year }</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Car;
