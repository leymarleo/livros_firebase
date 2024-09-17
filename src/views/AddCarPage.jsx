import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config.js';

function AddCarPage() {
    const navigate = useNavigate();

    const handleAddCar = async (e) => {
        e.preventDefault();

        const newCar = {
            model: document.querySelector('input[name=model]').value,
            brand: document.querySelector('input[name=brand]').value,
            year: document.querySelector('input[name=year]').value,
            photo: document.querySelector('input[name=photo]').value,
            story: document.querySelector('textarea[name=story]').value, // Campo adicionado
            seen: false, // Inicia como não visto
        };

        if (newCar.model && newCar.brand && newCar.year && newCar.photo) {
            newCar.user_id = auth.currentUser.uid;
            const docRef = await addDoc(collection(db, "carros"), newCar);
            newCar.id = docRef.id;

            alert('Carro incluído com sucesso!');
            navigate("/cars");
        } else {
            alert('Por favor, preencha os campos obrigatórios.');
        }
    };

    const pageTitle = "Adicionar Carro";

    return (
        <>
            <div className="container">
                <Header pageTitle={pageTitle} />
                <form className="add-form">
                    <div className="form-control">
                        <label>Modelo *</label>
                        <input type="text" name="model" placeholder="Modelo do carro" />
                    </div>
                    <div className="form-control">
                        <label>Marca *</label>
                        <input type="text" name="brand" placeholder="Marca" />
                    </div>
                    <div className="form-control">
                        <label>Ano de Criação *</label>
                        <input type="text" name="year" placeholder="Ano de criação" />
                    </div>
                    <div className="form-control">
                        <label>Foto (Link) *</label>
                        <input type="text" name="photo" placeholder="Link para a foto do carro" />
                    </div>
                    <div className="form-control">
                        <label>História</label>
                        <textarea name="story" placeholder="História do carro"></textarea>
                    </div>
                    <button onClick={handleAddCar} className="btn btn-block">Salvar</button>
                </form>
            </div>
        </>
    );
}

export default AddCarPage;
