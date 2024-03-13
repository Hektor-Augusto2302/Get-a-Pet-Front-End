import './MyPets.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoundedImage from '../../../components/layouts/RoundedImage/RoundedImage';
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

const MyPets = () => {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || "");
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token]);

    async function removePet(id) {
        let msgType = "success";

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPets(updatedPets)
            return response.data
        }).catch((err) => {
            msgType = "error";
            return err.response.data
        });

        setFlashMessage(data.message, msgType);
    }

    async function concludedAdoptions(id) {
        let msgType = "success";

        const data = await api.patch(`/pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = "error";
            return err.response.data
        });

        setFlashMessage(data.message, msgType);
    }

    return (
        <section>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className='m-0'>Meus Pets</h1>
                <Link className='petListHeader' to='/pet/add'>Cadastrar Pet</Link>
            </div>
            <div className='d-flex flex-column'>
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div className='petListRow d-flex align-items-center m-3 p-3' key={pet._id}>
                            <RoundedImage 
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className='actions'>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && (
                                            <button 
                                                className='concludeBtn'
                                                onClick={() => concludedAdoptions(pet._id)}
                                            >
                                                Concluir adoção
                                            </button>
                                        )}
                                        <Link to={`/pet/edit/${pet._id}`}>Editar Pet</Link>
                                        <button onClick={() => removePet(pet._id)}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Pet já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>{pets.length === 0 && <p>Não há pets cadastrados...</p>}</div>
        </section>
    )
}

export default MyPets