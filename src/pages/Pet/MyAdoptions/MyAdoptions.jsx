import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import RoundedImage from '../../../components/layouts/RoundedImage/RoundedImage';
import './MyAdoptions.css'

const MyAdoptions = () => {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || "");

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token]);

    return (
        <section>
            <div className='d-flex justify-content-space-between align-items-center mb-2'>
                <h1 className='m-0'>Minhas Adoções</h1>
            </div>
            <div>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className='petListRow p-1 m-1 d-flex align-items-center' key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className='ms-2'>
                                <p className='mb-1'>
                                    <span className='bold'>Ligue para: {pet.user.phone}</span>
                                </p>
                                <p className='mb-1'>
                                    <span className='bold'>Fale com: {pet.user.name}</span>
                                </p>
                            </div>
                            <div className='actions'>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Pet já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Ainda não há pets adotados</p>}
            </div>
        </section>
    )
}

export default MyAdoptions